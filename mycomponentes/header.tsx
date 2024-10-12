"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Header() {
    const [isVisible, setIsVisible] = useState(false)

    // Use effect to set visibility after component mounts
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true)
        }, 100); // Delay to see the transition effect
        
        return () => clearTimeout(timer); // Cleanup timer on unmount
    }, []);

    return (
        <div>{/* Header */}
        <header id="home" className="container mx-auto px-4 py-24 md:py-32 relative z-10">
          <div className="flex flex-col items-center md:flex-row md:justify-between">
            <div className="mb-6 md:mb-0 transition-all duration-1000 ease-in-out transform translate-y-10" 
              style={{ transform: isVisible ? 'translateY(0)' : 'translateY(2rem)', opacity: isVisible ? 1 : 0 }}>
              <h1 className="text-4xl font-bold mb-2 text-blue-400">Ryan Costa</h1>
              <p className="text-xl text-gray-300">Software Developer</p>
              <div className="flex flex-wrap space-y-2 md:space-y-0 md:space-x-2">
                {['React', 'React Native', 'Node.js', 'TypeScript', 'Python', 'Scraping', 'Supabase', 'Firebase'].map((stack) => (
                  <span key={stack} className="bg-gray-700 text-gray-100 px-3 py-1 rounded-full text-sm transition-colors duration-200 hover:bg-gray-400 hover:text-white">
                    {stack}
                  </span>
                ))}
              </div>
            </div>
            <div
              className="relative w-60 h-60 transition-all duration-1000 delay-300 ease-in-out transform"
              style={{ transform: isVisible ? 'scale(1)' : 'scale(0)' }}
            >
              <Image
                src="/ryan01.jpg"
                alt="Profile Picture"
                fill // This is the updated syntax to replace layout="fill"
                className="rounded-full border-4 border-blue-400 shadow-lg object-cover"
                priority // Optional: Load this image with priority
              />
            </div>
          </div>
        </header>
        </div>
    );
}
