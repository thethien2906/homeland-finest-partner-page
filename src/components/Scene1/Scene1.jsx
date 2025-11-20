import { useRef } from 'react'
import CircleAnimation from './CircleAnimation'
import DotsStagger from './DotsStagger'
import Map3D from './Map3D'
import './Scene1.css'

/**
 * Scene1: Intro Reveal
 * 
 * Component chính tích hợp tất cả sub-components:
 * - CircleAnimation: Vòng tròn SVG với animation vẽ và quay
 * - DotsStagger: Hiệu ứng dots lan toả từ tâm
 * - Map3D: Bản đồ Việt Nam 3D với floating animation và drag interaction
 * 
 * Timing sequence:
 * 1. Inner circle vẽ (0ms - 1185ms)
 * 2. Outer circle vẽ (1385ms - 2885ms)
 * 3. Dots fade in (1100ms - 1600ms)
 * 4. Dots animation 3 giai đoạn (2900ms - 4100ms)
 * 5. Circles scale up (3300ms - 3600ms)
 * 6. Map 3D fade in (4100ms - 5600ms)
 */
function Scene1() {
  const containerRef = useRef(null)

  return (
    <div ref={containerRef} className="scene1-container">
      {/* Z-index layering: Map (0) → Circles (1) → Dots (2) */}
      <Map3D />
      <CircleAnimation />
      <DotsStagger />
    </div>
  )
}

export default Scene1

