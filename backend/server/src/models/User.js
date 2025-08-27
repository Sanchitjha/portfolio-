import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true, minlength: 2, maxlength: 80 },
    email: { type: String, trim: true, required: true, lowercase: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    phone: { type: String, trim: true, default: "" },
    image: { type: String, trim: true, default: "" }, // URL to avatar
  },
  { timestamps: true },
)

UserSchema.methods.toPublic = function () {
  const { _id, name, email, phone, image, createdAt, updatedAt } = this
  return { id: _id.toString(), name, email, phone, image, createdAt, updatedAt }
}

export default mongoose.model("User", UserSchema)
