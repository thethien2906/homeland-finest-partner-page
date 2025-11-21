import { forwardRef, useRef, useMemo, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

/**
 * Frame3D: Component Khung nón (khung-non.glb)
 * 
 * Props:
 * - isWireframe: boolean - Chuyển đổi giữa Realistic và Wireframe materials
 * - position: [x, y, z] - Initial position (default: [0, 0.1, 0] - Frame ở trên Leaves một chút)
 * - scale: number | [x, y, z] - Scale của model (default: 1)
 * - rotation: [x, y, z] - Initial rotation (default: [0, 0, 0])
 * - ...props: Các props khác cho primitive object
 * 
 * Features:
 * - Load model từ /models/khung-non.glb
 * - Setup 2 set materials: Realistic (PBR) và Wireframe
 * - Initial positioning để xếp chồng với các bộ phận khác
 * - Expose ref để Scene2.jsx control animation
 */
const Frame3D = forwardRef(function Frame3D({ 
  isWireframe = false,
  position = [0, 0.1, 0], // Frame ở trên Leaves một chút
  scale = 1,
  rotation = [0, 0, 0],
  ...props 
}, ref) {
  const frameRef = useRef()
  const { scene } = useGLTF('/models/khung-non.glb')
  
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
    if (frameRef.current && ref) {
      if (typeof ref === 'function') {
        ref(frameRef.current)
      } else if (ref) {
        ref.current = frameRef.current
      }
    }
  }, [ref])
  
  if (!clonedScene) {
    return null
  }
  
  return (
    <primitive 
      ref={frameRef}
      object={clonedScene} 
      position={position}
      scale={scale}
      rotation={rotation}
      {...props}
    />
  )
})

// Preload model
useGLTF.preload('/models/khung-non.glb')

export default Frame3D

