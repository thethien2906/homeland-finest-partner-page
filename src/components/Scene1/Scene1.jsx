import { useRef } from 'react'
import CircleAnimation from './CircleAnimation'
import DotsStagger from './DotsStagger'
import Map3D from './Map3D'
import './Scene1.css'

function Scene1() {
  const containerRef = useRef(null)

  return (
    <div ref={containerRef} className="scene1-container">
      <CircleAnimation />
      <DotsStagger />
      <Map3D />
    </div>
  )
}

export default Scene1

