import { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, PerspectiveCamera } from '@react-three/drei'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import './Map3D.css'

// Helper function: Simple rotation (like Blender)
// 1 = 180 degrees (π radians), 0.5 = 90 degrees (π/2 radians), -1 = -180 degrees
const rot = (value) => value * Math.PI

// Load 3D model
function VietnamMap({ onDragStart, onDragEnd }) {
  const mapRef = useRef()
  const { scene } = useGLTF('/models/vn-map.glb')
  const baseRotationSpeed = 0.3
  const isDraggingRef = useRef(false)
  const previousMouseRef = useRef({ x: 0, y: 0 })
  const rotationVelocityRef = useRef(0)

  // Handle mouse drag to rotate object
  useEffect(() => {
    const handleMouseDown = (e) => {
      isDraggingRef.current = true
      previousMouseRef.current = { x: e.clientX, y: e.clientY }
      rotationVelocityRef.current = 0
      if (onDragStart) onDragStart()
    }

    const handleMouseMove = (e) => {
      if (isDraggingRef.current && mapRef.current) {
        const deltaX = e.clientX - previousMouseRef.current.x
        const deltaY = e.clientY - previousMouseRef.current.y
        
        // Rotate object based on mouse movement
        mapRef.current.rotation.y += deltaX * 0.005
        mapRef.current.rotation.x += deltaY * 0.005
        
        // Calculate rotation velocity for momentum
        rotationVelocityRef.current = deltaX * 0.005
        
        previousMouseRef.current = { x: e.clientX, y: e.clientY }
      }
    }

    const handleMouseUp = () => {
      isDraggingRef.current = false
      if (onDragEnd) onDragEnd()
    }

    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [onDragStart, onDragEnd])

  // Floating animation: spin like a top
  useFrame((state, delta) => {
    if (mapRef.current) {
      // Auto rotate when not dragging
      if (!isDraggingRef.current) {
        // Apply momentum if there's velocity
        if (Math.abs(rotationVelocityRef.current) > 0.001) {
          mapRef.current.rotation.y += rotationVelocityRef.current
          rotationVelocityRef.current *= 0.95 // Friction
        } else {
          // Return to base rotation speed
          mapRef.current.rotation.y += delta * baseRotationSpeed
        }
      }
      
      // Add slight floating effect (gentle up and down movement)
      mapRef.current.position.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  useGSAP(() => {
    if (mapRef.current && scene) {
      // Fade In Delay: 4100ms (after dots staggering completes)
      // Outer Circle Complete: 2900ms
      // Dots Animation Duration: 1200ms
      // Total: 2900ms + 1200ms = 4100ms
      // Fade In Duration: 1.5s
      // Scale: 0.8 → 1 (of final scale)
      
      // Set initial state
      // Initial scale: 0.8 of final scale (5 * 0.8 = 4)
      mapRef.current.scale.set(3, 3, 3)
      mapRef.current.traverse((child) => {
        if (child.isMesh) {
          child.material = child.material.clone()
          child.material.transparent = true
          child.material.opacity = 0
        }
      })

      // Fade in and scale animation
      const timeline = gsap.timeline({ delay: 4.1 }) // 4100ms after dots complete
      
      // Scale animation: 4 → 5 (0.8 → 1 of final scale)
      timeline.to(mapRef.current.scale, {
        x: 4,
        y: 4,
        z: 4,
        duration: 1.5,
        ease: 'power2.out'
      }, 0) // Start at same time as opacity

      // Opacity animation: 0 → 1
      mapRef.current.traverse((child) => {
        if (child.isMesh && child.material) {
          timeline.to(
            child.material,
            {
              opacity: 1,
              duration: 1.5,
              ease: 'power2.out'
            },
            0 // Start at same time as scale
          )
        }
      })
    }
  }, [scene])

  if (!scene) {
    return <group />
  }

  return (
    <primitive
      ref={mapRef}
      object={scene}
      scale={4} // Final scale to fit inner circle (300px diameter)
      position={[0, 0, -0.5]} // Move back in Z axis to be behind circles
      rotation={[rot(0.6), rot(-0.4), rot(0)]} // Initial rotation: tilted back, rotated
    />
  )
}

function Map3D() {
  // Preload model
  useEffect(() => {
    useGLTF.preload('/models/vn-map.glb')
  }, [])

  const handleDragStart = () => {
    // Optional: Add any UI feedback when dragging starts
  }

  const handleDragEnd = () => {
    // Optional: Add any UI feedback when dragging ends
  }

  return (
    <div className="map3d-container">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
        <ambientLight intensity={2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.8} />
        <VietnamMap 
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        />
      </Canvas>
    </div>
  )
}

export default Map3D

