import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Button } from "@/components/ui/button"
import './App.css'
import MicRecorderComponent from './components/ui/MicRecorder'

function App() {
  const [count, setCount] = useState(0)
  const [backendMessage, setBackendMessage] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:5001/api/test')
      .then((res) => res.json())
      .then((data) => {setBackendMessage(data.message)
        console.log('Backend message:', data.message);
      })
      .catch((err) => console.error('Error fetching backend:', err));
  }, []);

  return (
    <>
      
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <MicRecorderComponent />
        </div>
      
    </>
  )
}

export default App
