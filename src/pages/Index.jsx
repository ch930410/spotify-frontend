import { useEffect, useRef } from 'react';
import { Navbar } from '@/components'
import { Routes, Route, useLocation } from 'react-router-dom'
import { albumsData } from '@/assets/assets'

import Home from './Home'
import Album from './Album'

export default function Index() {
  const containerRef = useRef()
  const location = useLocation();
  const isAlibum = location.pathname.includes("album");

  const id = location.pathname.split('/').pop()
  const albumData = albumsData[id];

  useEffect(() => {
    if (isAlibum) {
      containerRef.current.style.background = `linear-gradient(${albumData.bgColor}, #121212)`;
    } else {
      containerRef.current.style.background = `#121212`;
    }
  })


  return <div ref={containerRef} className="w-full lg:m-2 px-4 lg:px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0">
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/album/:id" element={<Album />} />
      <Route path="*" element={<div className="text-whtie flex items-center justify-center text-2xl h-full tracking-[2px]">404</div>} />
    </Routes>
  </div>
}