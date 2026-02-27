import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import EmotionDetector from './features/expression/components/FaceExpression'

function App() {
  const [count, setCount] = useState(0)

  return (
    <EmotionDetector />
  )
}

export default App
