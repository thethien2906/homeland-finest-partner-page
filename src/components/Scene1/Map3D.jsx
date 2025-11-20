import { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, PerspectiveCamera } from '@react-three/drei'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import './Map3D.css'

// Helper function: Simple rotation (like Blender)
// 1 = 180 degrees (π radians), 0.5 = 90 degrees (π/2 radians), -1 = -180 degrees
const rot = (value) => value * Math.PI

// Calculate responsive scale based on viewport width
// Base scale: 4 (for 600px circles)
// 1080p (1025-1920px): scale 5.0 (for 750px circles, ratio: 750/600 = 1.25)
// 2.5K+ (>1920px): scale 4 (for 600px circles)
const getResponsiveScale = () => {
  if (typeof window === 'undefined') return 4
  const width = window.innerWidth
  if (width >= 1025 && width <= 1920) {
    // 1080p screens: scale up 25% to match larger circles (750px)
    return 3.8
  }
  // Base scale for other sizes
  return 4
}

// Load 3D model
function VietnamMap({ onDragStart, onDragEnd }) {
  const mapRef = useRef()
  const { scene } = useGLTF('/models/vn-map.glb')
  const baseRotationSpeed = 0.3
  const isDraggingRef = useRef(false)
  const previousMouseRef = useRef({ x: 0, y: 0 })
  const rotationVelocityRef = useRef(0)

  // Handle mouse and touch drag to rotate object
  useEffect(() => {
    const handleStart = (e) => {
      isDraggingRef.current = true
      const clientX = e.touches ? e.touches[0].clientX : e.clientX
      const clientY = e.touches ? e.touches[0].clientY : e.clientY
      previousMouseRef.current = { x: clientX, y: clientY }
      rotationVelocityRef.current = 0
      if (onDragStart) onDragStart()
      // Prevent default to avoid scrolling on touch devices
      if (e.touches) {
        e.preventDefault()
      }
    }

    const handleMove = (e) => {
      if (isDraggingRef.current && mapRef.current) {
        const clientX = e.touches ? e.touches[0].clientX : e.clientX
        const clientY = e.touches ? e.touches[0].clientY : e.clientY
        const deltaX = clientX - previousMouseRef.current.x
        const deltaY = clientY - previousMouseRef.current.y
        
        // Rotate object based on mouse/touch movement
        // Slightly slower on touch for better control
        const sensitivity = e.touches ? 0.003 : 0.005
        mapRef.current.rotation.y += deltaX * sensitivity
        mapRef.current.rotation.x += deltaY * sensitivity
        
        // Calculate rotation velocity for momentum
        rotationVelocityRef.current = deltaX * sensitivity
        
        previousMouseRef.current = { x: clientX, y: clientY }
        
        // Prevent default to avoid scrolling on touch devices
        if (e.touches) {
          e.preventDefault()
        }
      }
    }

    const handleEnd = () => {
      isDraggingRef.current = false
      if (onDragEnd) onDragEnd()
    }

    // Mouse events
    window.addEventListener('mousedown', handleStart)
    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseup', handleEnd)
    
    // Touch events for mobile
    window.addEventListener('touchstart', handleStart, { passive: false })
    window.addEventListener('touchmove', handleMove, { passive: false })
    window.addEventListener('touchend', handleEnd)

    return () => {
      window.removeEventListener('mousedown', handleStart)
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseup', handleEnd)
      window.removeEventListener('touchstart', handleStart)
      window.removeEventListener('touchmove', handleMove)
      window.removeEventListener('touchend', handleEnd)
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
      // Initial scale: 0.8 of final scale
      const finalScale = getResponsiveScale()
      const initialScale = finalScale * 0.8
      mapRef.current.scale.set(initialScale, initialScale, initialScale)
      mapRef.current.traverse((child) => {
        if (child.isMesh) {
          child.material = child.material.clone()
          child.material.transparent = true
          child.material.opacity = 0
        }
      })

      // Fade in and scale animation
      const timeline = gsap.timeline({ delay: 4.1 }) // 4100ms after dots complete
      
      // Scale animation: initialScale → finalScale
      timeline.to(mapRef.current.scale, {
        x: finalScale,
        y: finalScale,
        z: finalScale,
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

  // Get responsive scale for initial render
  const responsiveScale = getResponsiveScale()
  
  return (
    <primitive
      ref={mapRef}
      object={scene}
      scale={responsiveScale} // Responsive scale to match circle size
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

  // Responsive pixel ratio: Cap at 2x for performance, lower on mobile
  const getPixelRatio = () => {
    if (typeof window === 'undefined') return 1
    const isMobile = window.innerWidth < 768
    const baseRatio = window.devicePixelRatio || 1
    // Cap at 2x for desktop, 1.5x for mobile to improve performance
    return isMobile ? Math.min(baseRatio, 1.5) : Math.min(baseRatio, 2)
  }

  return (
    <div className="map3d-container">
      <Canvas
        dpr={getPixelRatio()}
        gl={{ antialias: true, alpha: false }}
      >
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

