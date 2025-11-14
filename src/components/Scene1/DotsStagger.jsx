import { useEffect, useRef } from 'react'
import anime from 'animejs'
import './DotsStagger.css'

function DotsStagger() {
  const containerRef = useRef(null)
  const dotsRef = useRef([])

  useEffect(() => {
    // Create 20 dots
    const dots = []
    for (let i = 0; i < 20; i++) {
      const dot = document.createElement('div')
      dot.className = 'dot'
      containerRef.current?.appendChild(dot)
      dots.push(dot)
    }
    dotsRef.current = dots

    // TODO: Implement stagger animation
    // Scale: 0 → 2 → 0
    // Opacity: 1 → 0
    // Stagger delay: 0.1s from center
    // Duration: 1.5s
    // Easing: easeInOutQuad

    return () => {
      // Cleanup
      dotsRef.current.forEach((dot) => {
        if (dot.parentNode) {
          dot.parentNode.removeChild(dot)
        }
      })
      dotsRef.current = []
    }
  }, [])

  return <div ref={containerRef} className="dots-stagger-container" />
}

export default DotsStagger

