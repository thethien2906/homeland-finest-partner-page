import { forwardRef, useRef, useMemo, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

/**
 * Strap3D: Component Quai nón (quai-non.glb)
 * 
 * Props:
 * - isWireframe: boolean - Chuyển đổi giữa Realistic và Wireframe materials
 * - position: [x, y, z] - Initial position (default: [0, -0.3, 0] - Strap ở dưới Rim)
 * - scale: number | [x, y, z] - Scale của model (default: 1)
 * - rotation: [x, y, z] - Initial rotation (default: [0, 0, 0])
 * - opacity: number - Initial opacity (default: 0 - sẽ fade in khi scroll)
 * - ...props: Các props khác cho primitive object
 * 
 * Features:
 * - Load model từ /models/quai-non.glb
 * - Setup 2 set materials: Realistic (PBR) và Wireframe
 * - Initial positioning để xếp chồng với các bộ phận khác
 * - Expose ref để Scene2.jsx control animation
 */
const Strap3D = forwardRef(function Strap3D({ 
  isWireframe = false,
  position = [0, -0.3, 0], // Strap ở dưới Rim
  scale = 1,
  rotation = [0, 0, 0],
  opacity = 0, // Bắt đầu với opacity 0 (sẽ fade in)
  ...props 
}, ref) {
  const strapRef = useRef()
  const { scene } = useGLTF('/models/quai-non.glb')
  
  // Clone scene để tránh conflict khi load nhiều lần
  const clonedScene = useMemo(() => {
    if (!scene) return null
    return scene.clone()
  }, [scene])
  
  // Setup materials: Realistic và Wireframe
  useEffect(() => {
    if (!clonedScene) return
    
    clonedScene.traverse((child) => {
      if (child.isMesh) {
        // Store original material (chỉ clone một lần)
        if (!child.userData.originalMaterial) {
          child.userData.originalMaterial = child.material.clone()
          // Đảm bảo original material có transparent = true để control opacity
          child.userData.originalMaterial.transparent = true
          child.userData.originalMaterial.opacity = opacity
        }
        
        // Create wireframe material (chỉ tạo một lần)
        if (!child.userData.wireframeMaterial) {
          child.userData.wireframeMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: true,
            transparent: true,
            opacity: 0 // Bắt đầu với opacity 0
          })
        }
        
        // Apply material based on isWireframe prop
        if (isWireframe) {
          child.material = child.userData.wireframeMaterial
        } else {
          child.material = child.userData.originalMaterial
          // Update opacity của original material
          child.material.opacity = opacity
        }
      }
    })
  }, [clonedScene, isWireframe, opacity])
  
  // Expose ref để Scene2 control animation
  useEffect(() => {
    if (strapRef.current && ref) {
      if (typeof ref === 'function') {
        ref(strapRef.current)
      } else if (ref) {
        ref.current = strapRef.current
      }
    }
  }, [ref])
  
  if (!clonedScene) {
    return null
  }
  
  return (
    <primitive 
      ref={strapRef}
      object={clonedScene} 
      position={position}
      scale={scale}
      rotation={rotation}
      {...props}
    />
  )
})

// Preload model
useGLTF.preload('/models/quai-non.glb')

export default Strap3D

