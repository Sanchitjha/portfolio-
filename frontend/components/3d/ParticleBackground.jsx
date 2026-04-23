"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import * as THREE from "three"

function Particles(props) {
  const ref = useRef()

  // Generate random particle positions
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(8000 * 3)
    const colors = new Float32Array(8000 * 3)

    for (let i = 0; i < 8000; i++) {
      // Random positions in a sphere
      const x = (Math.random() - 0.5) * 15
      const y = (Math.random() - 0.5) * 15
      const z = (Math.random() - 0.5) * 15

      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z

      // Blue to purple gradient colors
      const color = new THREE.Color()
      color.setHSL(0.6 + Math.random() * 0.2, 0.8, 0.5 + Math.random() * 0.3)

      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }

    return [positions, colors]
  }, [])

  // Animate particles
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.08) * 0.1
    }
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} colors={colors} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          vertexColors
          size={0.012}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  )
}

function FloatingCube({ position, color, speed = 1 }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.008 * speed
      meshRef.current.rotation.y += 0.008 * speed
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.4
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.4, 0.4, 0.4]} />
      <meshStandardMaterial color={color} transparent opacity={0.7} />
    </mesh>
  )
}

function FloatingSphere({ position, color, speed = 1 }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.004 * speed
      meshRef.current.rotation.y += 0.004 * speed
      meshRef.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * speed * 0.7) * 0.3
      meshRef.current.position.z = position[2] + Math.cos(state.clock.elapsedTime * speed * 0.7) * 0.3
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.25, 32, 32]} />
      <meshStandardMaterial color={color} transparent opacity={0.8} />
    </mesh>
  )
}

function FloatingTorus({ position, color, speed = 1 }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.006 * speed
      meshRef.current.rotation.y += 0.006 * speed
      meshRef.current.rotation.z += 0.003 * speed
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed * 1.2) * 0.2
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <torusGeometry args={[0.3, 0.1, 16, 100]} />
      <meshStandardMaterial color={color} transparent opacity={0.6} />
    </mesh>
  )
}

export default function ParticleBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 75 }}
        style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)" }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#3b82f6" />
        <pointLight position={[-10, -10, -10]} intensity={0.6} color="#8b5cf6" />
        <pointLight position={[0, 10, -10]} intensity={0.4} color="#06b6d4" />
        <Particles />
        {/* Floating geometric shapes representing tech stack */}
        <FloatingCube position={[-4, 2, -3]} color="#339933" speed={0.8} /> {/* Node.js green */}
        <FloatingCube position={[4, -1, -4]} color="#F7DF1E" speed={1.1} /> {/* JavaScript yellow */}
        <FloatingSphere position={[3, 3, -2]} color="#47A248" speed={0.6} /> {/* MongoDB green */}
        <FloatingSphere position={[-3, -2, -3]} color="#61DAFB" speed={1.3} /> {/* React blue */}
        <FloatingTorus position={[0, -3, -5]} color="#3776AB" speed={0.9} /> {/* Python blue */}
        <FloatingTorus position={[-2, 4, -1]} color="#E10098" speed={1.4} /> {/* GraphQL pink */}
        <FloatingCube position={[2, -4, -2]} color="#FF6B35" speed={0.7} /> {/* API orange */}
        <FloatingSphere position={[-4, 0, -4]} color="#4479A1" speed={1.0} /> {/* MySQL blue */}
      </Canvas>
    </div>
  )
}
