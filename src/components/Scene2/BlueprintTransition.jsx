import { useRef } from 'react'

/**
 * BlueprintTransition: Component chuyển đổi wireframe & background
 * 
 * Features:
 * - Material swap: Realistic → Wireframe (được handle trong các component 3D)
 * - Background transition: Đen → Sáng (#000 → #f5f5f5)
 * - Visual style shift hoàn toàn
 * - Timing: Phase 5 (80-90% scroll)
 * 
 * Implementation sẽ được hoàn thiện ở Bước 5
 */
function BlueprintTransition() {
  const overlayRef = useRef(null)
  
  // Animation sẽ được control bởi GSAP Timeline trong Scene2.jsx
  // Hiện tại chỉ setup structure cơ bản
  
  return (
    <div 
      ref={overlayRef} 
      className="blueprint-transition"
      style={{
        backgroundColor: 'transparent',
        transition: 'background-color 1s ease-in-out'
      }}
    />
  )
}

export default BlueprintTransition

