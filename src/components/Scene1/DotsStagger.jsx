import { useEffect, useRef } from 'react'
import anime from 'animejs'
import './DotsStagger.css'

function DotsStagger() {
  const containerRef = useRef(null)
  const dotsRef = useRef([])
  const animationRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Create grid with more rows and columns
    // Grid should fit inside inner circle (radius ~150px when scaled, diameter ~300px)
    const dots = []
    const dotSize = 2 // Reduced to half (was 4px, now 2px) to fit more dots
    const gap = 25 // Reduced gap proportionally to fit more dots
    
    // Create a larger grid (13x13) to get double the number of dots
    // We'll use all dots that fit inside inner circle
    const gridSize = 13 // 13x13 grid for more dots (doubled from 9x9)
    const centerRow = Math.floor(gridSize / 2) // 4
    const centerCol = Math.floor(gridSize / 2) // 4
    
    // Calculate max distance to fit inside inner circle
    // Inner circle radius = 100 in viewBox, scaled to ~150px
    // So max distance from center should be ~140px to stay inside
    const maxDistance = 140
    
    // Create all possible positions in grid that fit inside inner circle
    const positions = []
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const offsetX = (col - centerCol) * (dotSize + gap)
        const offsetY = (row - centerRow) * (dotSize + gap)
        const distance = Math.sqrt(offsetX * offsetX + offsetY * offsetY)
        
        if (distance <= maxDistance) {
          positions.push({
            row,
            col,
            offsetX,
            offsetY,
            distance
          })
        }
      }
    }
    
    // Sort by distance from center (closest first)
    positions.sort((a, b) => a.distance - b.distance)
    // Use all positions that fit inside inner circle (no limit)
    const selectedPositions = positions
    
    // Create dots at selected positions
    selectedPositions.forEach((pos, index) => {
      const dot = document.createElement('div')
      dot.className = 'dot'
      
      // Position the dot
      dot.style.left = `calc(50% + ${pos.offsetX}px)`
      dot.style.top = `calc(50% + ${pos.offsetY}px)`
      dot.style.marginLeft = `-${dotSize / 2}px` // Center the dot
      dot.style.marginTop = `-${dotSize / 2}px` // Center the dot
      
      // Ensure dot is invisible initially
      dot.style.opacity = '0'
      dot.style.visibility = 'hidden' // Also hide with visibility to ensure it's not visible
      dot.style.transform = 'scale(1) translate(0, 0)'
      
      dot.setAttribute('data-row', pos.row)
      dot.setAttribute('data-col', pos.col)
      
      containerRef.current.appendChild(dot)
      dots.push(dot)
    })
    dotsRef.current = dots

    // Store original positions and calculate distances for animation
    const dotData = dots.map((dot) => {
      const row = parseInt(dot.getAttribute('data-row'))
      const col = parseInt(dot.getAttribute('data-col'))
      const offsetX = (col - centerCol) * (dotSize + gap)
      const offsetY = (row - centerRow) * (dotSize + gap)
      const distance = Math.sqrt(offsetX * offsetX + offsetY * offsetY)
      const manhattanDistance = Math.abs(row - centerRow) + Math.abs(col - centerCol)
      
      return {
        dot,
        originalOffsetX: offsetX,
        originalOffsetY: offsetY,
        distance,
        manhattanDistance
      }
    })

    // Calculate timing from CircleAnimation.jsx:
    // - Inner circle: 300ms duration + 15ms * 59 bars = ~1185ms
    // - Outer circle delay: 1185ms + 200ms = 1385ms
    // - Outer circle: 6 dashes, each 1500/6 = ~250ms (reduced from 416.67ms)
    // - Total outer circle draw time: 1385ms + (250 * 6) = ~2885ms (reduced from 3885ms)
    // Note: innerTotalTime = 300 + (15 * 59) = 1185ms
    // Start fade in slightly before inner circle fully completes for smoother transition
    const innerCircleCompleteTime = 1100 // ~1.1s - start fade in when inner circle is almost done
    const outerCircleCompleteTime = 2900 // ~2.9s - wait for outer circle to complete (reduced from 3.9s)
    const fadeInDuration = 500 // Fade in duration (0.5s)
    
    // Animation timing
    const phase1Duration = 400 // Co lại về tâm (0.4s)
    const phase2Duration = 300 // Giãn nở mạnh (0.3s)
    const phase3Duration = 500 // Trở về và fade out (0.5s)
    const totalDuration = phase1Duration + phase2Duration + phase3Duration

    // Set initial state for all dots (invisible initially)
    dots.forEach((dot) => {
      dot.style.opacity = '0'
      dot.style.visibility = 'hidden' // Hide with visibility
      dot.style.transform = 'scale(1) translate(0, 0)'
    })
    
    // Fade in dots after inner circle completes
    // Use setTimeout to ensure animation runs after component is mounted
    const fadeInTimeoutId = setTimeout(() => {
      // Start fade in animation - anime.js will handle visibility automatically
      const fadeInAnim = anime({
        targets: dots,
        opacity: [0, 1],
        duration: fadeInDuration,
        easing: 'easeInOutQuad',
        begin: () => {
          // Set visibility at the exact moment animation begins (before first frame)
          dots.forEach((dot) => {
            dot.style.visibility = 'visible'
          })
        },
        complete: () => {
          // Ensure dots stay visible after fade in
          dots.forEach((dot) => {
            dot.style.opacity = '1'
            dot.style.visibility = 'visible'
          })
        }
      })
      
      // Store fade in animation for cleanup
      if (animationRef.current) {
        animationRef.current.fadeInAnim = fadeInAnim
      }
    }, innerCircleCompleteTime)
    
    // Create 3-phase animation for each dot
    const animations = []
    
    dotData.forEach(({ dot, originalOffsetX, originalOffsetY, distance, manhattanDistance }) => {
      // Calculate movement amounts based on distance from center
      // Dots farther from center move more
      const pullAmount = Math.min(distance * 0.3, 30) // Co về tâm (max 30px)
      const pushAmount = Math.min(distance * 0.5, 50) // Bật ra ngoài (max 50px)
      
      // Calculate direction vector (normalized)
      const directionX = originalOffsetX !== 0 ? originalOffsetX / distance : 0
      const directionY = originalOffsetY !== 0 ? originalOffsetY / distance : 0
      
      // Phase 1: Co lại về tâm
      const pullX = -directionX * pullAmount
      const pullY = -directionY * pullAmount
      
      // Phase 2: Bật ra ngoài
      const pushX = directionX * pushAmount
      const pushY = directionY * pushAmount
      
      // Stagger delay based on Manhattan distance (dots closer to center animate first)
      const staggerDelay = manhattanDistance * 50 // 50ms per unit distance
      
      // Total delay: wait for outer circle + stagger delay
      const totalDelay = outerCircleCompleteTime + staggerDelay
      
      // Create timeline animation with 3 phases
      // Important: Keep opacity = 1 in Phase 1 and Phase 2, only fade out in Phase 3
      const anim = anime({
        targets: dot,
        keyframes: [
          // Phase 1: Co lại về tâm (keep opacity = 1)
          {
            translateX: [0, pullX],
            translateY: [0, pullY],
            scale: [1, 0.5],
            opacity: [1, 1], // Keep visible
            duration: phase1Duration,
            easing: 'easeInQuad'
          },
          // Phase 2: Giãn nở mạnh (keep opacity = 1)
          {
            translateX: [pullX, pushX],
            translateY: [pullY, pushY],
            scale: [0.5, 2.5],
            opacity: [1, 1], // Keep visible
            duration: phase2Duration,
            easing: 'easeOutQuad'
          },
          // Phase 3: Trở về vị trí ban đầu và fade out
          {
            translateX: [pushX, 0],
            translateY: [pushY, 0],
            scale: [2.5, 0],
            opacity: [1, 0], // Fade out
            duration: phase3Duration,
            easing: 'easeInOutQuad'
          }
        ],
        delay: totalDelay,
        easing: 'linear'
      })
      
      animations.push(anim)
    })
    
    // Store all animations and timeouts for cleanup
    animationRef.current = {
      animations,
      fadeInAnim: null, // Will be set by setTimeout
      fadeInTimeoutId,
      pause: () => {
        clearTimeout(fadeInTimeoutId)
        if (animationRef.current.fadeInAnim) {
          animationRef.current.fadeInAnim.pause()
        }
        animations.forEach(anim => anim.pause())
      }
    }

    return () => {
      // Cleanup
      if (animationRef.current) {
        animationRef.current.pause()
        animationRef.current = null
      }
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

