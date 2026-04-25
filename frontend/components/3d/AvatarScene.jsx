"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Stars, Float } from "@react-three/drei"
import * as THREE from "three"

function TechOrb({ color, radius, speed, offset, yAmp }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const angle = t * speed + offset
    ref.current.position.x = Math.cos(angle) * radius
    ref.current.position.z = Math.sin(angle) * radius
    ref.current.position.y = Math.sin(t * 0.8 + offset) * yAmp
  })
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} />
    </mesh>
  )
}

function HoloRing({ radius, thickness, color, rotSpeed, initialRotation }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    ref.current.rotation.x = initialRotation[0] + t * rotSpeed[0]
    ref.current.rotation.y = initialRotation[1] + t * rotSpeed[1]
    ref.current.rotation.z = initialRotation[2] + t * rotSpeed[2]
  })
  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, thickness, 8, 64]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} transparent opacity={0.5} />
    </mesh>
  )
}

function DevAvatar({ mousePosition }) {
  const groupRef = useRef()
  const headRef = useRef()
  const leftEyeRef = useRef()
  const rightEyeRef = useRef()
  const coreRef = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (groupRef.current) groupRef.current.scale.y = 1 + Math.sin(t * 1.5) * 0.01

    if (headRef.current) {
      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        (mousePosition?.x || 0) * 0.4,
        0.05
      )
      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        -(mousePosition?.y || 0) * 0.2,
        0.05
      )
    }

    if (leftEyeRef.current && rightEyeRef.current) {
      const pulse = 1.5 + Math.sin(t * 3) * 0.5
      leftEyeRef.current.material.emissiveIntensity = pulse
      rightEyeRef.current.material.emissiveIntensity = pulse
    }
    if (coreRef.current) coreRef.current.rotation.z = t * 1.5
  })

  return (
    <group ref={groupRef} position={[0, -0.3, 0]}>
      {/* HEAD */}
      <group ref={headRef} position={[0, 1.5, 0]}>
        <mesh>
          <sphereGeometry args={[0.42, 32, 32]} />
          <meshStandardMaterial color="#0d1b2a" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Visor */}
        <mesh position={[0, 0.02, 0.35]} scale={[0.7, 0.35, 0.1]}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.3} transparent opacity={0.4} />
        </mesh>
        {/* Eyes */}
        <mesh ref={leftEyeRef} position={[-0.14, 0.06, 0.38]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={2} />
        </mesh>
        <mesh ref={rightEyeRef} position={[0.14, 0.06, 0.38]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={2} />
        </mesh>
        {/* Ear fins */}
        <mesh position={[-0.42, 0, 0]} rotation={[0, 0, Math.PI / 6]}>
          <boxGeometry args={[0.04, 0.2, 0.3]} />
          <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.6} />
        </mesh>
        <mesh position={[0.42, 0, 0]} rotation={[0, 0, -Math.PI / 6]}>
          <boxGeometry args={[0.04, 0.2, 0.3]} />
          <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.6} />
        </mesh>
        {/* Antenna */}
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.3, 8]} />
          <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.8} />
        </mesh>
        <mesh position={[0, 0.68, 0]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color="#a78bfa" emissive="#a78bfa" emissiveIntensity={3} />
        </mesh>
      </group>

      {/* NECK */}
      <mesh position={[0, 1.05, 0]}>
        <cylinderGeometry args={[0.1, 0.13, 0.2, 8]} />
        <meshStandardMaterial color="#0d1b2a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* TORSO */}
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[0.85, 0.95, 0.45]} />
        <meshStandardMaterial color="#0d1b2a" metalness={0.85} roughness={0.15} />
      </mesh>

      {/* Shoulder pads */}
      <mesh position={[-0.5, 0.8, 0]}>
        <boxGeometry args={[0.18, 0.12, 0.48]} />
        <meshStandardMaterial color="#1e3a5f" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0.5, 0.8, 0]}>
        <boxGeometry args={[0.18, 0.12, 0.48]} />
        <meshStandardMaterial color="#1e3a5f" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Chest Core */}
      <mesh ref={coreRef} position={[0, 0.48, 0.23]}>
        <torusGeometry args={[0.11, 0.025, 16, 32]} />
        <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={2} />
      </mesh>
      <mesh position={[0, 0.48, 0.23]}>
        <sphereGeometry args={[0.055, 16, 16]} />
        <meshStandardMaterial color="#c4b5fd" emissive="#c4b5fd" emissiveIntensity={3} />
      </mesh>

      {/* Chest panel details */}
      <mesh position={[-0.2, 0.18, 0.23]}>
        <boxGeometry args={[0.14, 0.05, 0.01]} />
        <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={1} />
      </mesh>
      <mesh position={[0.2, 0.18, 0.23]}>
        <boxGeometry args={[0.14, 0.05, 0.01]} />
        <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={1} />
      </mesh>

      {/* LEFT ARM */}
      <group position={[-0.58, 0.65, 0]} rotation={[0, 0, 0.25]}>
        <mesh position={[0, -0.25, 0]}>
          <cylinderGeometry args={[0.09, 0.08, 0.5, 8]} />
          <meshStandardMaterial color="#0d1b2a" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, -0.52, 0]}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color="#1e3a5f" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[-0.05, -0.78, 0.05]} rotation={[0.2, 0, 0.1]}>
          <cylinderGeometry args={[0.075, 0.065, 0.45, 8]} />
          <meshStandardMaterial color="#0d1b2a" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[-0.09, -1.02, 0.08]}>
          <boxGeometry args={[0.12, 0.1, 0.12]} />
          <meshStandardMaterial color="#1e3a5f" metalness={0.7} roughness={0.3} />
        </mesh>
      </group>

      {/* RIGHT ARM */}
      <group position={[0.58, 0.65, 0]} rotation={[0, 0, -0.25]}>
        <mesh position={[0, -0.25, 0]}>
          <cylinderGeometry args={[0.09, 0.08, 0.5, 8]} />
          <meshStandardMaterial color="#0d1b2a" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, -0.52, 0]}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color="#1e3a5f" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0.05, -0.78, 0.05]} rotation={[0.2, 0, -0.1]}>
          <cylinderGeometry args={[0.075, 0.065, 0.45, 8]} />
          <meshStandardMaterial color="#0d1b2a" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0.09, -1.02, 0.08]}>
          <boxGeometry args={[0.12, 0.1, 0.12]} />
          <meshStandardMaterial color="#1e3a5f" metalness={0.7} roughness={0.3} />
        </mesh>
      </group>

      {/* LEGS */}
      <mesh position={[-0.22, -0.3, 0]}>
        <cylinderGeometry args={[0.11, 0.09, 0.7, 8]} />
        <meshStandardMaterial color="#0d1b2a" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0.22, -0.3, 0]}>
        <cylinderGeometry args={[0.11, 0.09, 0.7, 8]} />
        <meshStandardMaterial color="#0d1b2a" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[-0.22, -0.65, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#1e3a5f" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0.22, -0.65, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#1e3a5f" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[-0.22, -1.0, 0]}>
        <cylinderGeometry args={[0.09, 0.1, 0.65, 8]} />
        <meshStandardMaterial color="#0d1b2a" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0.22, -1.0, 0]}>
        <cylinderGeometry args={[0.09, 0.1, 0.65, 8]} />
        <meshStandardMaterial color="#0d1b2a" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[-0.22, -1.38, 0.08]}>
        <boxGeometry args={[0.22, 0.1, 0.35]} />
        <meshStandardMaterial color="#1e3a5f" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0.22, -1.38, 0.08]}>
        <boxGeometry args={[0.22, 0.1, 0.35]} />
        <meshStandardMaterial color="#1e3a5f" metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  )
}

function Scene({ mousePosition }) {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[3, 5, 3]} intensity={1.5} color="#3b82f6" />
      <pointLight position={[-3, -2, -3]} intensity={0.8} color="#8b5cf6" />
      <pointLight position={[0, 3, -2]} intensity={1} color="#06b6d4" />
      <pointLight position={[0, -2, 3]} intensity={0.5} color="#a78bfa" />

      <Stars radius={100} depth={60} count={3500} factor={4} saturation={0.5} fade speed={0.5} />

      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
        <DevAvatar mousePosition={mousePosition} />
      </Float>

      <TechOrb color="#68d391" radius={2.2} speed={0.45} offset={0} yAmp={0.4} />
      <TechOrb color="#63b3ed" radius={2.5} speed={0.35} offset={1.05} yAmp={0.3} />
      <TechOrb color="#fbd38d" radius={2.0} speed={0.55} offset={2.1} yAmp={0.5} />
      <TechOrb color="#fc8181" radius={2.7} speed={0.3} offset={3.14} yAmp={0.35} />
      <TechOrb color="#b794f4" radius={2.3} speed={0.5} offset={4.19} yAmp={0.45} />
      <TechOrb color="#76e4f7" radius={2.1} speed={0.4} offset={5.24} yAmp={0.3} />

      <HoloRing radius={2.4} thickness={0.018} color="#3b82f6" rotSpeed={[0.1, 0.2, 0]} initialRotation={[0, 0, 0]} />
      <HoloRing radius={2.65} thickness={0.012} color="#8b5cf6" rotSpeed={[0.15, 0, 0.1]} initialRotation={[Math.PI / 3, 0, 0]} />
      <HoloRing radius={2.2} thickness={0.01} color="#06b6d4" rotSpeed={[0, 0.1, 0.15]} initialRotation={[0, 0, Math.PI / 4]} />
    </>
  )
}

export default function AvatarScene({ mousePosition }) {
  return (
    <Canvas
      camera={{ position: [0, 0.2, 5], fov: 45 }}
      style={{ background: "transparent" }}
      dpr={[1, 2]}
    >
      <Scene mousePosition={mousePosition} />
    </Canvas>
  )
}
