import { forwardRef, useRef, useMemo, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

/**
 * Rim3D: Component Vành nón (vanh-non.glb)
 * 
 * Props:
 * - isWireframe: boolean - Chuyển đổi giữa Realistic và Wireframe materials
 * - position: [x, y, z] - Initial position (default: [0, -0.5, 0] - Rim ở dưới)
 * - scale: number | [x, y, z] - Scale của model (default: 1)
 * - rotation: [x, y, z] - Initial rotation (default: [0, 0, 0])
 * - ...props: Các props khác cho primitive object
 * 
 * Features:
 * - Load model từ /models/vanh-non.glb
 * - Setup 2 set materials: Realistic (PBR) và Wireframe
 * - Initial positioning để xếp chồng với các bộ phận khác
 * - Expose ref để Scene2.jsx control animation
 */
const Rim3D = forwardRef(function Rim3D({ 
  isWireframe = false,
  position = [0, -0.5, 0], // Rim ở dưới cùng
  scale = 1,
  rotation = [0, 0, 0],
  ...props 
}, ref) {
  const rimRef = useRef()
  const { scene } = useGLTF('/models/vanh-non.glb')
  
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
          // Đảm bảo original material có opacity = 1
          if (child.userData.originalMaterial.transparent === undefined) {
            child.userData.originalMaterial.transparent = false
          }
          child.userData.originalMaterial.opacity = 1
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
        }
      }
    })
  }, [clonedScene, isWireframe])
  
  // Expose ref để Scene2 control animation
  useEffect(() => {
    if (rimRef.current && ref) {
      if (typeof ref === 'function') {
        ref(rimRef.current)
      } else if (ref) {
        ref.current = rimRef.current
      }
    }
  }, [ref])
  
  if (!clonedScene) {
    return null
  }
  
  return (
    <primitive 
      ref={rimRef}
      object={clonedScene} 
      position={position}
      scale={scale}
      rotation={rotation}
      {...props}
    />
  )
})

// Preload model
useGLTF.preload('/models/vanh-non.glb')

export default Rim3D

