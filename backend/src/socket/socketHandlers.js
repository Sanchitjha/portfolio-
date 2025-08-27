import jwt from "jsonwebtoken"
import User from "../models/User.js"
import Message from "../models/Message.js"

// Socket authentication middleware
const authenticateSocket = async (socket, next) => {
  try {
    const token = socket.handshake.auth.token

    if (!token) {
      return next(new Error("Authentication error"))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id).select("-password")

    if (!user || !user.isActive) {
      return next(new Error("Authentication error"))
    }

    socket.user = user
    next()
  } catch (error) {
    next(new Error("Authentication error"))
  }
}

export const initializeSocket = (io) => {
  // Use authentication middleware
  io.use(authenticateSocket)

  io.on("connection", (socket) => {
    console.log(`User ${socket.user.username} connected`)

    // Join user to their personal room
    socket.join(`user_${socket.user.id}`)

    // Handle joining conversation rooms
    socket.on("join_conversation", (recipientId) => {
      const roomId = [socket.user.id, recipientId].sort().join("_")
      socket.join(roomId)
      console.log(`User ${socket.user.username} joined conversation room: ${roomId}`)
    })

    // Handle leaving conversation rooms
    socket.on("leave_conversation", (recipientId) => {
      const roomId = [socket.user.id, recipientId].sort().join("_")
      socket.leave(roomId)
      console.log(`User ${socket.user.username} left conversation room: ${roomId}`)
    })

    // Handle sending messages
    socket.on("send_message", async (data) => {
      try {
        const { recipientId, content, messageType = "text", codeSnippet } = data

        // Validate recipient
        const recipient = await User.findById(recipientId)
        if (!recipient) {
          socket.emit("error", { message: "Recipient not found" })
          return
        }

        // Create message
        const message = await Message.create({
          sender: socket.user.id,
          recipient: recipientId,
          content,
          messageType,
          codeSnippet,
        })

        const populatedMessage = await Message.findById(message._id)
          .populate("sender", "username firstName lastName avatar")
          .populate("recipient", "username firstName lastName avatar")

        // Send to conversation room
        const roomId = [socket.user.id, recipientId].sort().join("_")
        io.to(roomId).emit("new_message", populatedMessage)

        // Send notification to recipient if they're online
        io.to(`user_${recipientId}`).emit("message_notification", {
          senderId: socket.user.id,
          senderName: socket.user.username,
          content: content.substring(0, 50) + (content.length > 50 ? "..." : ""),
          messageId: message._id,
        })
      } catch (error) {
        console.error("Send message error:", error)
        socket.emit("error", { message: "Failed to send message" })
      }
    })

    // Handle message read status
    socket.on("mark_message_read", async (messageId) => {
      try {
        const message = await Message.findById(messageId)

        if (message && message.recipient.toString() === socket.user.id) {
          message.isRead = true
          message.readAt = new Date()
          await message.save()

          // Notify sender that message was read
          io.to(`user_${message.sender}`).emit("message_read", {
            messageId,
            readAt: message.readAt,
          })
        }
      } catch (error) {
        console.error("Mark message read error:", error)
      }
    })

    // Handle typing indicators
    socket.on("typing_start", (recipientId) => {
      const roomId = [socket.user.id, recipientId].sort().join("_")
      socket.to(roomId).emit("user_typing", {
        userId: socket.user.id,
        username: socket.user.username,
      })
    })

    socket.on("typing_stop", (recipientId) => {
      const roomId = [socket.user.id, recipientId].sort().join("_")
      socket.to(roomId).emit("user_stopped_typing", {
        userId: socket.user.id,
      })
    })

    // Handle user status updates
    socket.on("update_status", async (status) => {
      try {
        if (["online", "away", "busy", "offline"].includes(status)) {
          socket.user.status = status
          await socket.user.save()

          // Broadcast status to all connected users
          socket.broadcast.emit("user_status_changed", {
            userId: socket.user.id,
            status,
          })
        }
      } catch (error) {
        console.error("Update status error:", error)
      }
    })

    // Handle disconnect
    socket.on("disconnect", async () => {
      console.log(`User ${socket.user.username} disconnected`)

      try {
        // Update last seen
        socket.user.lastSeen = new Date()
        await socket.user.save()

        // Broadcast offline status
        socket.broadcast.emit("user_status_changed", {
          userId: socket.user.id,
          status: "offline",
          lastSeen: socket.user.lastSeen,
        })
      } catch (error) {
        console.error("Disconnect error:", error)
      }
    })
  })
}
