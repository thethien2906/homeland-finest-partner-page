import React from 'react'
import ReactDOM from 'react-dom/client'
// Import your test component here
// Example: import YourTestComponent from './YourTestComponent.jsx'
// import SimpleTest from './SimpleTest.jsx'  // Uncomment để test setup cơ bản
import Scene2Test from './Scene2TestWithControls.jsx'
import '../src/index.css'

ReactDOM.createRoot(document.getElementById('test-root')).render(
  <React.StrictMode>
    {/* Add your test component here */}
    {/* Example: <YourTestComponent /> */}
    {/* <SimpleTest /> */}  {/* Uncomment để test setup cơ bản trước */}
    <Scene2Test />
  </React.StrictMode>,
)

