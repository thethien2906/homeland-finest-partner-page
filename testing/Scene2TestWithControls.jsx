import React, { useEffect, useState } from 'react'
import Scene2 from '../src/components/Scene2'
import '../src/index.css'

/**
 * Scene2TestWithControls: Component test với controls để điều chỉnh vị trí models
 * 
 * Sử dụng:
 * 1. Mở http://localhost:5173/testing/test.html
 * 2. Sử dụng panel bên phải để điều chỉnh vị trí từng model
 * 3. Copy giá trị đã điều chỉnh vào Scene2.jsx
 */

// Initial positions để test và điều chỉnh
// Updated với giá trị đã test và điều chỉnh
const DEFAULT_POSITIONS = {
  rim: { x: 0, y: 0.2, z: 1.991 },
  strap: { x: 0, y: -0.29, z: 2 },
  leaves: { x: 0.07, y: 0.017, z: 2.3 },
  ribs: { x: 0.78, y: -0.16, z: 1.54 },
  frame: { x: 0, y: 0.19, z: 2 },
}

function Scene2TestWithControls() {
  const [positions, setPositions] = useState(DEFAULT_POSITIONS)
  const [showControls, setShowControls] = useState(true)
  const [enableOrbitControls, setEnableOrbitControls] = useState(true) // Enable OrbitControls mặc định
  const [strapOpacity, setStrapOpacity] = useState(1) // Opacity của Strap để test

  useEffect(() => {
    window.scrollTo(0, 0)
    console.log('[Scene2TestWithControls] Component mounted')
  }, [])

  const updatePosition = (part, axis, value) => {
    setPositions(prev => ({
      ...prev,
      [part]: {
        ...prev[part],
        [axis]: parseFloat(value) || 0
      }
    }))
  }

  const resetPositions = () => {
    setPositions(DEFAULT_POSITIONS)
  }

  const copyToClipboard = () => {
    const code = `const INITIAL_POSITIONS = {
  rim: [${positions.rim.x}, ${positions.rim.y}, ${positions.rim.z}],
  strap: [${positions.strap.x}, ${positions.strap.y}, ${positions.strap.z}],
  leaves: [${positions.leaves.x}, ${positions.leaves.y}, ${positions.leaves.z}],
  ribs: [${positions.ribs.x}, ${positions.ribs.y}, ${positions.ribs.z}],
  frame: [${positions.frame.x}, ${positions.frame.y}, ${positions.frame.z}],
}`
    navigator.clipboard.writeText(code)
    alert('Đã copy vào clipboard! Paste vào Scene2.jsx')
  }

  return (
    <div style={{ 
      width: '100vw', 
      minHeight: '100vh',
      backgroundColor: '#000',
      position: 'relative',
      display: 'flex'
    }}>
      {/* Main content */}
      <div style={{ 
        flex: 1,
        position: 'relative'
      }}>
        {/* Spacer trước Scene2 */}
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
        
        {/* Scene2 với custom positions và enable controls để navigate */}
        <Scene2 
          initialPositions={{
            rim: [positions.rim.x, positions.rim.y, positions.rim.z],
            strap: [positions.strap.x, positions.strap.y, positions.strap.z],
            leaves: [positions.leaves.x, positions.leaves.y, positions.leaves.z],
            ribs: [positions.ribs.x, positions.ribs.y, positions.ribs.z],
            frame: [positions.frame.x, positions.frame.y, positions.frame.z],
          }}
          enableControls={enableOrbitControls} // Enable OrbitControls để navigate camera
          strapOpacity={strapOpacity} // Opacity của Strap để test
        />
        
        {/* Spacer sau Scene2 */}
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

      {/* Control Panel */}
      {showControls && (
        <div style={{
          position: 'fixed',
          right: 0,
          top: 0,
          width: '350px',
          height: '100vh',
          backgroundColor: 'rgba(30, 30, 30, 0.95)',
          color: '#fff',
          padding: '20px',
          overflowY: 'auto',
          zIndex: 1000,
          borderLeft: '1px solid #444'
        }}>
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ marginBottom: '10px', fontSize: '18px' }}>Position Controls</h2>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ 
                display: 'flex', 
                alignItems: 'center',
                cursor: 'pointer',
                fontSize: '14px'
              }}>
                <input
                  type="checkbox"
                  checked={enableOrbitControls}
                  onChange={(e) => setEnableOrbitControls(e.target.checked)}
                  style={{ marginRight: '8px' }}
                />
                Enable Camera Controls (OrbitControls)
              </label>
              <div style={{ fontSize: '11px', color: '#aaa', marginTop: '5px', marginLeft: '24px' }}>
                Click & drag: Rotate | Scroll: Zoom | Right-click & drag: Pan
              </div>
            </div>
            <div>
              <button
              onClick={() => setShowControls(false)}
              style={{
                padding: '5px 10px',
                backgroundColor: '#555',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                marginBottom: '10px'
              }}
            >
              Hide Controls
            </button>
            <button
              onClick={resetPositions}
              style={{
                padding: '5px 10px',
                backgroundColor: '#666',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                marginLeft: '10px'
              }}
            >
              Reset
            </button>
            <button
              onClick={copyToClipboard}
              style={{
                padding: '5px 10px',
                backgroundColor: '#4CAF50',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                marginLeft: '10px'
              }}
            >
              Copy Code
            </button>
            </div>
          </div>

          {/* Strap Opacity Control */}
          <div style={{ 
            marginBottom: '20px',
            padding: '15px',
            backgroundColor: 'rgba(50, 50, 50, 0.5)',
            borderRadius: '5px'
          }}>
            <h3 style={{ 
              marginBottom: '10px', 
              fontSize: '16px',
              color: '#4CAF50'
            }}>
              Strap Opacity (Quai nón)
            </h3>
            <div style={{ marginBottom: '8px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '5px',
                fontSize: '12px',
                color: '#aaa'
              }}>
                Opacity: {strapOpacity.toFixed(2)}
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={strapOpacity}
                onChange={(e) => setStrapOpacity(parseFloat(e.target.value))}
                style={{ width: '100%' }}
              />
              <input
                type="number"
                min="0"
                max="1"
                step="0.01"
                value={strapOpacity}
                onChange={(e) => setStrapOpacity(parseFloat(e.target.value) || 0)}
                style={{
                  width: '80px',
                  marginLeft: '10px',
                  padding: '3px',
                  backgroundColor: '#222',
                  color: '#fff',
                  border: '1px solid #555',
                  borderRadius: '3px'
                }}
              />
            </div>
            <div style={{ fontSize: '11px', color: '#aaa', marginTop: '5px' }}>
              Nếu không thấy quai nón, thử tăng opacity lên 1.0
            </div>
          </div>

          {Object.entries(positions).map(([part, pos]) => (
            <div key={part} style={{ 
              marginBottom: '20px',
              padding: '15px',
              backgroundColor: 'rgba(50, 50, 50, 0.5)',
              borderRadius: '5px'
            }}>
              <h3 style={{ 
                marginBottom: '10px', 
                fontSize: '16px',
                textTransform: 'capitalize',
                color: '#4CAF50'
              }}>
                {part}
              </h3>
              {['x', 'y', 'z'].map(axis => (
                <div key={axis} style={{ marginBottom: '8px' }}>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '5px',
                    fontSize: '12px',
                    color: '#aaa'
                  }}>
                    {axis.toUpperCase()}: {pos[axis].toFixed(2)}
                  </label>
                  <input
                    type="range"
                    min="-2"
                    max="2"
                    step="0.01"
                    value={pos[axis]}
                    onChange={(e) => updatePosition(part, axis, e.target.value)}
                    style={{ width: '100%' }}
                  />
                  <input
                    type="number"
                    value={pos[axis]}
                    onChange={(e) => updatePosition(part, axis, e.target.value)}
                    style={{
                      width: '80px',
                      marginLeft: '10px',
                      padding: '3px',
                      backgroundColor: '#222',
                      color: '#fff',
                      border: '1px solid #555',
                      borderRadius: '3px'
                    }}
                  />
                </div>
              ))}
            </div>
          ))}

          <div style={{ 
            marginTop: '20px',
            padding: '15px',
            backgroundColor: 'rgba(50, 50, 50, 0.5)',
            borderRadius: '5px',
            fontSize: '12px'
          }}>
            <h4 style={{ marginBottom: '10px' }}>Current Values:</h4>
            <pre style={{ 
              fontSize: '11px',
              color: '#aaa',
              overflow: 'auto',
              maxHeight: '200px'
            }}>
              {JSON.stringify(positions, null, 2)}
            </pre>
          </div>
        </div>
      )}

      {/* Show Controls Button */}
      {!showControls && (
        <button
          onClick={() => setShowControls(true)}
          style={{
            position: 'fixed',
            right: '20px',
            top: '20px',
            padding: '10px 15px',
            backgroundColor: '#4CAF50',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '5px',
            zIndex: 1001
          }}
        >
          Show Controls
        </button>
      )}
    </div>
  )
}

export default Scene2TestWithControls

