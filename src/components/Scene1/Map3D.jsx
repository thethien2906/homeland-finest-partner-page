import { useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, PerspectiveCamera } from '@react-three/drei'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import './Map3D.css'

// Load 3D model
function VietnamMap() {
  const mapRef = useRef()
  const { scene } = useGLTF('/models/vn-map.glb')

  useGSAP(() => {
    if (mapRef.current) {
      // TODO: Implement fade in and scale animation
      // Fade In Delay: 1.5s
      // Fade In Duration: 1.5s
      // Scale: 0.8 → 1
    }
  }, [])

  return (
    <primitive
      ref={mapRef}
      object={scene}
      scale={0.8}
      position={[0, 0, 0]}
    />
  )
}

// Ripple Effect Component
function RippleEffect() {
  const ringsRef = useRef([])
  const rippleAnimations = useRef([])

  useEffect(() => {
    // TODO: Implement ripple effect
    // 3 ring geometries
    // Scale: 1 → 3
    // Opacity: 0.6 → 0
    // Duration: 2s
    // Interval: 2s
    // Stagger: 0.3s between rings

    return () => {
      // Cleanup intervals and animations
      rippleAnimations.current.forEach((anim) => {
        if (anim.scaleAnim) anim.scaleAnim.kill()
        if (anim.opacityAnim) anim.opacityAnim.kill()
      })
    }
  }, [])

  return (
    <>
      {/* TODO: Render 3 ring geometries */}
    </>
  )
}

function Map3D() {
  // Preload model
  useEffect(() => {
    useGLTF.preload('/models/vn-map.glb')
  }, [])

  return (
    <div className="map3d-container">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <VietnamMap />
        <RippleEffect />
      </Canvas>
    </div>
  )
}

export default Map3D

