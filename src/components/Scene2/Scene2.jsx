import { useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, OrbitControls } from '@react-three/drei'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Rim3D from './Rim3D'
import Leaves3D from './Leaves3D'
import Frame3D from './Frame3D'
import Ribs3D from './Ribs3D'
import Strap3D from './Strap3D'
import IlluminationEffect from './IlluminationEffect'
import CalloutLines from './CalloutLines'
import BlueprintTransition from './BlueprintTransition'
import './Scene2.css'

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

/**
 * Scene2: Deconstructing the Nón Lá
 * 
 * Component chính tích hợp tất cả sub-components:
 * - 5 components 3D: Rim3D, Leaves3D, Frame3D, Ribs3D, Strap3D
 * - IlluminationEffect: Hiệu ứng ánh sáng quét
 * - CalloutLines: Callout lines và text labels
 * - BlueprintTransition: Chuyển đổi wireframe & background
 * 
 * Scroll-based timeline với 6 phases:
 * 1. Phase 1: The Ret-con Reveal (0-10% scroll)
 * 2. Phase 2: The Tilt & Separation (10-30% scroll)
 * 3. Phase 3: The Orbital Spin (30-60% scroll)
 * 4. Phase 4: The Illumination (60-80% scroll)
 * 5. Phase 5: The Blueprint Switch (80-90% scroll)
 * 6. Phase 6: The Callouts (90-100% scroll)
 */

// Initial positions để xếp chồng tạo nón lá hoàn chỉnh
// Thứ tự từ dưới lên trên: Rim → Strap → Leaves → Ribs → Frame
// Updated với giá trị đã test và điều chỉnh
const DEFAULT_INITIAL_POSITIONS = {
  rim: [0, 0.2, 1.991],
  strap: [0, -0.29, 2],
  leaves: [0.07, 0.017, 2.3],
  ribs: [0.78, -0.16, 1.54],
  frame: [0, 0.19, 2],
}

function Scene2({ 
  initialPositions = DEFAULT_INITIAL_POSITIONS,
  enableControls = false, // Enable OrbitControls để navigate camera (dùng khi test)
  strapOpacity = 1 // Opacity của Strap (1 để hiển thị khi test, 0 để fade in khi scroll)
}) {
  // Sử dụng positions từ props hoặc default
  const INITIAL_POSITIONS = initialPositions
  const sceneRef = useRef(null)
  const containerRef = useRef(null)
  const timelineRef = useRef(null)
  
  // State để control wireframe mode
  const [isWireframe, setIsWireframe] = useState(false)
  
  // Refs cho 5 components 3D
  const rimRef = useRef()
  const leavesRef = useRef()
  const frameRef = useRef()
  const ribsRef = useRef()
  const strapRef = useRef()
  
  // Refs cho camera và lighting
  const cameraRef = useRef()
  const ambientLightRef = useRef()
  
  // Setup GSAP Timeline với ScrollTrigger
  useGSAP(() => {
    if (!containerRef.current) return
    
    // Tạo timeline với ScrollTrigger
    timelineRef.current = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        pin: true,
        anticipatePin: 1,
      }
    })
    
    // Timeline sẽ được implement chi tiết ở các bước sau
    // Hiện tại chỉ setup cấu trúc cơ bản
    
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill()
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])
  
  return (
    <div ref={containerRef} className="scene2-container">
      {/* Three.js Canvas */}
      <Canvas 
        ref={sceneRef} 
        className="scene2-canvas"
        gl={{ antialias: true, alpha: false }}
        dpr={typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1}
      >
        <PerspectiveCamera 
          ref={cameraRef}
          makeDefault 
          position={[0, 0, 5]} 
          fov={50}
        />
        
        {/* OrbitControls để navigate camera (chỉ khi enableControls = true) */}
        {enableControls && (
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={3}
            maxDistance={10}
            minPolarAngle={0}
            maxPolarAngle={Math.PI}
          />
        )}
        
        {/* Lighting */}
        <ambientLight ref={ambientLightRef} intensity={1.0} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
        
        {/* 5 Components 3D với initial positions */}
        <Rim3D 
          ref={rimRef} 
          isWireframe={isWireframe}
          position={INITIAL_POSITIONS.rim}
        />
        <Leaves3D 
          ref={leavesRef} 
          isWireframe={isWireframe}
          position={INITIAL_POSITIONS.leaves}
        />
        <Frame3D 
          ref={frameRef} 
          isWireframe={isWireframe}
          position={INITIAL_POSITIONS.frame}
        />
        <Ribs3D 
          ref={ribsRef} 
          isWireframe={isWireframe}
          position={INITIAL_POSITIONS.ribs}
        />
        <Strap3D 
          ref={strapRef} 
          isWireframe={isWireframe}
          position={INITIAL_POSITIONS.strap}
          opacity={strapOpacity} // Opacity của Strap (có thể control khi test)
        />
        
        {/* Illumination Effect */}
        <IlluminationEffect />
      </Canvas>
      
      {/* Blueprint Transition Overlay */}
      <BlueprintTransition />
      
      {/* Callout Lines & Text Labels */}
      <CalloutLines 
        rimRef={rimRef}
        leavesRef={leavesRef}
        frameRef={frameRef}
        ribsRef={ribsRef}
        strapRef={strapRef}
      />
    </div>
  )
}

export default Scene2

