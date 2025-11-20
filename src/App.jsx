import { useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Lenis from '@studio-freight/lenis'
import anime from 'animejs'
import { useStore } from './store/store'
import Scene1 from './components/Scene1'
import './App.css'

function Scene() {
  const meshRef = useRef()

  useGSAP(() => {
    if (meshRef.current) {
      gsap.to(meshRef.current.rotation, {
        y: Math.PI * 2,
        duration: 2,
        repeat: -1,
        ease: 'none'
      })
    }
  })

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <mesh ref={meshRef}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      <OrbitControls />
    </>
  )
}

function App() {
  const lenisRef = useRef(null)
  const animeRef = useRef(null)
  const gsapBoxRef = useRef(null)
  const { count, increment } = useStore()

  useEffect(() => {
    // Khởi tạo Lenis cho smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    lenisRef.current = lenis

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    // Khởi tạo Anime.js animation
    animeRef.current = anime({
      targets: '.anime-box',
      translateX: 250,
      rotate: '1turn',
      backgroundColor: '#FFF',
      duration: 2000,
      loop: true,
      direction: 'alternate',
      easing: 'easeInOutQuad'
    })

    return () => {
      if (animeRef.current) {
        animeRef.current.pause()
      }
    }
  }, [])

  useGSAP(() => {
    if (gsapBoxRef.current) {
      gsap.to(gsapBoxRef.current, {
        y: -20,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut'
      })
    }
  }, [])

  return (
    <div className="app">
      {/* Scene 1: Intro Reveal - Auto-play on page load */}
      <Scene1 />

      {/* Scene 2: Deconstructing the Nón Lá - Will be implemented next */}
      {/* <Scene2 /> */}

      {/* Demo sections - có thể comment lại khi cần */}
      {/* 
      <header className="header">
        <h1>React 3D Animation Project</h1>
        <p>Đã tích hợp: GSAP, Three.js, Lenis, Anime.js, Zustand</p>
      </header>

      <div className="content">
        <section className="section">
          <h2>Three.js Scene</h2>
          <div className="canvas-container">
            <Canvas>
              <Scene />
            </Canvas>
          </div>
        </section>

        <section className="section">
          <h2>Zustand Store Demo</h2>
          <div className="store-demo">
            <p>Count: {count}</p>
            <button onClick={increment} className="btn">
              Increment
            </button>
          </div>
        </section>

        <section className="section">
          <h2>Anime.js Demo</h2>
          <div className="anime-container">
            <div className="anime-box"></div>
          </div>
        </section>

        <section className="section">
          <h2>GSAP Demo</h2>
          <div className="gsap-demo">
            <div ref={gsapBoxRef} className="gsap-box">GSAP Animation</div>
          </div>
        </section>
      </div>
      */}
    </div>
  )
}

export default App

