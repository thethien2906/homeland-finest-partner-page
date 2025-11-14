import { useEffect, useRef } from 'react'
import anime from 'animejs'
import './CircleAnimation.css'

function CircleAnimation() {
  const svgRef = useRef(null)
  const innerBarsRef = useRef(null)
  const outerBarsRef = useRef(null)
  const innerRotationRef = useRef(null)
  const outerRotationRef = useRef(null)
  const innerBarsElementsRef = useRef([])
  const outerBarsElementsRef = useRef([])
  const resizeHandlerRef = useRef(null)
  const innerAnimationFrameIdRef = useRef(null)
  const outerAnimationFrameIdRef = useRef(null)

  useEffect(() => {
    if (!innerBarsRef.current || !outerBarsRef.current) return

    const innerRadius = 100
    const outerRadius = 150
    const outerCircumference = 2 * Math.PI * outerRadius

    // Outer circle: 6 dash strokes
    const gapLength = 20
    const totalGaps = 6 * gapLength
    const totalDashLength = outerCircumference - totalGaps
    const dashLength = totalDashLength / 6
    const dashAngle = (dashLength / outerCircumference) * 360
    const gapAngle = (gapLength / outerCircumference) * 360

    // Clear old dash strokes
    while (outerBarsRef.current.firstChild) {
      outerBarsRef.current.removeChild(outerBarsRef.current.firstChild)
    }
    outerBarsElementsRef.current = []

    // Create 6 dash strokes for outer circle
    const startOffset = -90 // Start from 12 o'clock
    
    for (let i = 0; i < 6; i++) {
      const startAngle = startOffset + i * (dashAngle + gapAngle)
      const endAngle = startAngle + dashAngle
      
      const startRadian = (startAngle * Math.PI) / 180
      const endRadian = (endAngle * Math.PI) / 180

      const x1 = 200 + outerRadius * Math.cos(startRadian)
      const y1 = 200 + outerRadius * Math.sin(startRadian)
      const x2 = 200 + outerRadius * Math.cos(endRadian)
      const y2 = 200 + outerRadius * Math.sin(endRadian)

      const largeArcFlag = dashAngle > 180 ? 1 : 0
      const sweepFlag = 1
      
      const pathData = `M ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} ${sweepFlag} ${x2} ${y2}`

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      path.setAttribute('d', pathData)
      path.setAttribute('fill', 'none')
      path.setAttribute('stroke', '#ffffff')
      path.setAttribute('stroke-width', '2')
      path.setAttribute('stroke-linecap', 'round')
      path.style.transformOrigin = '200 200' // SVG coordinate center
      
      outerBarsRef.current.appendChild(path)
      
      const pathLength = path.getTotalLength()
      path.setAttribute('stroke-dasharray', pathLength)
      path.setAttribute('stroke-dashoffset', pathLength)
      path.setAttribute('data-length', pathLength)
      
      outerBarsElementsRef.current.push(path)
    }

    // Create vertical bars for inner circle
    const numberOfBars = 60
    const barLength = 15
    const barWidth = 0.5
    
    while (innerBarsRef.current.firstChild) {
      innerBarsRef.current.removeChild(innerBarsRef.current.firstChild)
    }
    innerBarsElementsRef.current = []

    for (let i = 0; i < numberOfBars; i++) {
      const angle = (i * 360) / numberOfBars
      const radian = (angle * Math.PI) / 180
      
      const x1 = 200 + innerRadius * Math.cos(radian)
      const y1 = 200 + innerRadius * Math.sin(radian)
      const x2 = 200 + (innerRadius + barLength) * Math.cos(radian)
      const y2 = 200 + (innerRadius + barLength) * Math.sin(radian)

      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      line.setAttribute('x1', x1)
      line.setAttribute('y1', y1)
      line.setAttribute('x2', x2)
      line.setAttribute('y2', y2)
      line.setAttribute('stroke', '#ffffff')
      line.setAttribute('stroke-width', barWidth)
      line.setAttribute('stroke-linecap', 'round')
      line.setAttribute('opacity', '0')
      line.style.transformOrigin = '200 200' // SVG coordinate center
      
      innerBarsRef.current.appendChild(line)
      innerBarsElementsRef.current.push(line)
    }

    // Inner Circle: Draw animation
    const innerDuration = 300
    const innerStaggerDelay = 15
    const innerTotalTime = innerDuration + (innerStaggerDelay * (numberOfBars - 1))
    
    const innerDrawAnim = anime({
      targets: innerBarsElementsRef.current,
      opacity: [0, 1],
      duration: innerDuration,
      easing: 'easeInOutQuad',
      delay: anime.stagger(innerStaggerDelay)
    })

    // Position wrapper element at center - set once and lock it
    const wrapperEl = svgRef.current?.parentElement
    
    if (wrapperEl) {
      const wrapperWidth = 600
      const wrapperHeight = 600
      
      // Lock the wrapper position
      wrapperEl.style.position = 'fixed'
      wrapperEl.style.left = '50%'
      wrapperEl.style.top = '50%'
      wrapperEl.style.marginLeft = `-${wrapperWidth / 2}px`
      wrapperEl.style.marginTop = `-${wrapperHeight / 2}px`
      wrapperEl.style.width = `${wrapperWidth}px`
      wrapperEl.style.height = `${wrapperHeight}px`
      wrapperEl.style.padding = '0'
      
      // Remove any transform to avoid conflicts with anime.js
      wrapperEl.style.transform = 'none'
    }
    
    // FIX: SVG transform origin drift issue
    // Solution: Use fixed center point (200, 200) which is the center of viewBox
    // All elements are created around this point, so this is the correct rotation center
    // Use rotate(angle, centerX, centerY) directly for better precision
    
    const innerRotationDuration = 30000 // 30 seconds
    const outerRotationDuration = 45000 // 45 seconds
    const innerStartTime = performance.now()
    
    // Fixed center point - all elements are created around (200, 200) in viewBox coordinates
    const centerX = 200
    const centerY = 200
    
    // Manual rotation function for inner circle
    const animateInnerRotation = () => {
      const elapsed = performance.now() - innerStartTime
      // Use modulo to loop the rotation, keep angle in range [0, 360)
      const innerRotationAngle = ((elapsed % innerRotationDuration) / innerRotationDuration) * 360
      
      if (innerBarsRef.current) {
        // Use rotate(angle, centerX, centerY) directly - this is the most precise way
        innerBarsRef.current.setAttribute(
          'transform',
          `rotate(${innerRotationAngle}, ${centerX}, ${centerY})`
        )
      }
      
      innerAnimationFrameIdRef.current = requestAnimationFrame(animateInnerRotation)
    }
    
    // Start inner rotation animation
    animateInnerRotation()
    innerRotationRef.current = { pause: () => {
      if (innerAnimationFrameIdRef.current) {
        cancelAnimationFrame(innerAnimationFrameIdRef.current)
        innerAnimationFrameIdRef.current = null
      }
    }}
    
    // Outer Circle: Draw animation
    // Reduced from 2500ms to 1500ms total for faster completion
    const dashAppearDuration = 1500 / 6
    const innerDrawCompleteTime = innerTotalTime
    const outerStartDelay = innerDrawCompleteTime + 200
    
    const outerDrawAnim = anime({
      targets: outerBarsElementsRef.current,
      strokeDashoffset: function(el) {
        const pathLength = parseFloat(el.getAttribute('data-length'))
        return [pathLength, 0]
      },
      delay: anime.stagger(dashAppearDuration, { start: outerStartDelay }),
      duration: dashAppearDuration,
      easing: 'easeInOutQuad'
    })

    // Outer Circle: Rotation animation
    const totalDrawTime = outerStartDelay + dashAppearDuration * 6
    let outerStartTime = null
    
    // Manual rotation function for outer circle
    const animateOuterRotation = () => {
      if (outerStartTime === null) {
        outerStartTime = performance.now()
      }
      
      const elapsed = performance.now() - outerStartTime
      // Use modulo to loop the rotation, keep angle in range [0, 360)
      const outerRotationAngle = ((elapsed % outerRotationDuration) / outerRotationDuration) * 360
      
      if (outerBarsRef.current) {
        // Use rotate(angle, centerX, centerY) directly - same center point (200, 200) as inner circle
        outerBarsRef.current.setAttribute(
          'transform',
          `rotate(${outerRotationAngle}, ${centerX}, ${centerY})`
        )
      }
      
      outerAnimationFrameIdRef.current = requestAnimationFrame(animateOuterRotation)
    }
    
    // Start outer rotation after delay
    setTimeout(() => {
      animateOuterRotation()
    }, totalDrawTime)
    
    outerRotationRef.current = { pause: () => {
      if (outerAnimationFrameIdRef.current) {
        cancelAnimationFrame(outerAnimationFrameIdRef.current)
        outerAnimationFrameIdRef.current = null
      }
    }}
    
    console.log('✅ Animation setup complete')

    return () => {
      if (innerDrawAnim) innerDrawAnim.pause()
      if (outerDrawAnim) outerDrawAnim.pause()
      if (innerAnimationFrameIdRef.current) {
        cancelAnimationFrame(innerAnimationFrameIdRef.current)
        innerAnimationFrameIdRef.current = null
      }
      if (outerAnimationFrameIdRef.current) {
        cancelAnimationFrame(outerAnimationFrameIdRef.current)
        outerAnimationFrameIdRef.current = null
      }
      if (innerRotationRef.current) innerRotationRef.current.pause()
      if (outerRotationRef.current) outerRotationRef.current.pause()
    }
  }, [])

  return (
    <div className="circle-animation-wrapper">
      <svg
        ref={svgRef}
        className="circle-animation"
        viewBox="0 0 400 400"
        preserveAspectRatio="xMidYMid meet"
      >
        <g
          ref={innerBarsRef}
          className="circle-inner"
        />
        
        <g
          ref={outerBarsRef}
          className="circle-outer"
        />
      </svg>
    </div>
  )
}

export default CircleAnimation