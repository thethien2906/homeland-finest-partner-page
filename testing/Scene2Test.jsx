import React, { useEffect } from 'react'
import Scene2 from '../src/components/Scene2'
import '../src/index.css'

// Error Boundary Component
class Scene2ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('[Scene2Test] Error caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          width: '100vw', 
          height: '100vh',
          backgroundColor: '#000',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          padding: '20px'
        }}>
          <h1 style={{ color: '#ff0000', marginBottom: '20px' }}>Error loading Scene2</h1>
          <pre style={{ color: '#fff', fontSize: '14px', textAlign: 'left' }}>
            {this.state.error?.toString()}
          </pre>
          {this.state.error?.stack && (
            <pre style={{ color: '#888', fontSize: '12px', marginTop: '20px', textAlign: 'left', maxWidth: '80%', overflow: 'auto' }}>
              {this.state.error.stack}
            </pre>
          )}
        </div>
      )
    }

    return this.props.children
  }
}

/**
 * Scene2Test: Component test cho Scene2
 * 
 * Mục đích: Test Scene2 độc lập trước khi tích hợp vào App.jsx
 * 
 * Cách sử dụng:
 * 1. Chạy dev server: npm run dev
 * 2. Mở trình duyệt: http://localhost:5173/testing/test.html
 * 3. Test scroll và các animation
 * 4. Điều chỉnh parameters trong Scene2 nếu cần
 * 
 * Lưu ý:
 * - Scene2 sử dụng GSAP ScrollTrigger với pin: true
 * - Cần có đủ scroll distance để test các phases
 * - Scene2 sẽ tự động pin trong viewport khi scroll
 */
function Scene2Test() {
  useEffect(() => {
    // Reset scroll position khi mount
    window.scrollTo(0, 0)
    
    // Debug: Log để đảm bảo component mount
    console.log('[Scene2Test] Component mounted')
    
    // Có thể thêm Lenis smooth scroll ở đây nếu cần
    // Hiện tại test với native scroll trước
  }, [])
  
  return (
    <Scene2ErrorBoundary>
      <div style={{ 
        width: '100vw', 
        minHeight: '100vh',
        backgroundColor: '#000',
        position: 'relative'
      }}>
        {/* Spacer trước Scene2 để có thể scroll vào */}
        <div style={{ 
          height: '50vh', 
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: '24px'
        }}>
          <p>Scroll down to test Scene2...</p>
        </div>
        
        {/* Scene2 - sẽ được pin trong viewport khi scroll */}
        <Scene2 />
        
        {/* Spacer sau Scene2 để có đủ scroll distance */}
        <div style={{ 
          height: '100vh', 
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: '24px'
        }}>
          <p>End of Scene2 test</p>
        </div>
      </div>
    </Scene2ErrorBoundary>
  )
}

export default Scene2Test
