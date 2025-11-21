import { useRef } from 'react'

/**
 * CalloutLines: Component callout lines và text labels
 * 
 * Props:
 * - rimRef: ref của Rim3D component
 * - leavesRef: ref của Leaves3D component
 * - frameRef: ref của Frame3D component
 * - ribsRef: ref của Ribs3D component
 * - strapRef: ref của Strap3D component
 * 
 * Features:
 * - SVG hoặc CSS lines từ vật thể ra 2 góc màn hình
 * - Text labels với typewriter hoặc fade in effect
 * - 2 nhóm: Góc trên-phải và góc dưới-trái
 * - Timing: Phase 6 (90-100% scroll)
 * 
 * Implementation sẽ được hoàn thiện ở Bước 6
 */
function CalloutLines({ rimRef, leavesRef, frameRef, ribsRef, strapRef }) {
  const containerRef = useRef(null)
  
  // Animation sẽ được control bởi GSAP Timeline trong Scene2.jsx
  // Hiện tại chỉ setup structure cơ bản
  
  return (
    <div ref={containerRef} className="callout-lines-container">
      {/* SVG cho callout lines */}
      <svg className="callout-svg" width="100%" height="100%">
        {/* Lines sẽ được vẽ động dựa trên 3D → 2D coordinates */}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 10 3, 0 6" fill="#ffffff" />
          </marker>
        </defs>
      </svg>
      
      {/* Text labels */}
      <div className="callout-text-group callout-text-group-top-right">
        {/* Nhóm 1: Góc trên-phải */}
        {/* Leaves, Frame, Ribs callouts */}
      </div>
      
      <div className="callout-text-group callout-text-group-bottom-left">
        {/* Nhóm 2: Góc dưới-trái */}
        {/* Strap, Rim callouts */}
      </div>
    </div>
  )
}

export default CalloutLines

