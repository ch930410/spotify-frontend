import { useState } from 'react'
import reactLogo from './assets/react.svg'
import logo from '/logo.png'
import { Sidebar, Player } from '@/components'
import { usePlayer } from '@/context';
import Index from './pages/Index'

function App() {
  const [count, setCount] = useState(0)

  const { audioRef, track } = usePlayer();

  return (
    <div className="h-screen bg-black">
      <div className="h-[90%] flex">
        <Sidebar />
        <Index />
      </div>
      <Player />
      <audio ref={audioRef} src={track.file} preload="auto"></audio>
    </div>
  )
}

export default App