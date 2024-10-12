

"use client"

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Github, Linkedin, Mail, Code, Smartphone, Globe, GraduationCap, Book } from 'lucide-react'
import Footer from '@/mycomponentes/footer'
import Header from '@/mycomponentes/header'

// Snake animation constants and types
const CELL_SIZE = 10;
const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 1000;
const SNAKE_LENGTH = 20;
const MOVE_INTERVAL = 50; // milliseconds

type Point = {
  x: number;
  y: number;
};

export default function Component() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    setIsVisible(true)

    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'education', 'contact']
      const scrollPosition = window.scrollY

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element && scrollPosition >= element.offsetTop - 100) {
          setActiveSection(section)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let snake: Point[] = Array(SNAKE_LENGTH).fill({ x: 0, y: 0 })
    let direction: Point = { x: 1, y: 0 }
    let target: Point = { x: 0, y: 0 }

    const generateTarget = () => {
      target = {
        x: Math.floor(Math.random() * (CANVAS_WIDTH / CELL_SIZE)) * CELL_SIZE,
        y: Math.floor(Math.random() * (CANVAS_HEIGHT / CELL_SIZE)) * CELL_SIZE
      }
    }

    generateTarget()

    const moveSnake = () => {
      // Calculate direction towards target
      const dx = target.x - snake[0].x
      const dy = target.y - snake[0].y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < CELL_SIZE) {
        generateTarget()
      } else {
        direction = {
          x: dx / distance,
          y: dy / distance
        }
      }

      // Move snake
      const newHead = {
        x: snake[0].x + direction.x * CELL_SIZE,
        y: snake[0].y + direction.y * CELL_SIZE
      }

      // Wrap around edges
      newHead.x = (newHead.x + CANVAS_WIDTH) % CANVAS_WIDTH
      newHead.y = (newHead.y + CANVAS_HEIGHT) % CANVAS_HEIGHT

      snake.unshift(newHead)
      snake.pop()
    }

    const drawSnake = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      snake.forEach((segment, index) => {
        const alpha = 1 - (index / SNAKE_LENGTH)
        ctx.fillStyle = `rgba(59, 130, 246, ${alpha * 0.5})` // semi-transparent blue with fading tail
        ctx.beginPath()
        ctx.arc(segment.x + CELL_SIZE / 2, segment.y + CELL_SIZE / 2, CELL_SIZE / 2, 0, 2 * Math.PI)
        ctx.fill()
      })
    }

    const gameLoop = () => {
      moveSnake()
      drawSnake()
    }

    const intervalId = setInterval(gameLoop, MOVE_INTERVAL)

    return () => clearInterval(intervalId)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 relative overflow-hidden">
      <canvas 
        ref={canvasRef} 
        width={CANVAS_WIDTH} 
        height={CANVAS_HEIGHT} 
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-gray-900 bg-opacity-90 backdrop-filter backdrop-blur-lg z-50">
        <div className="container mx-auto px-4 py-4">
          <ul className="flex justify-center space-x-6">
            {['Home', 'About', 'Skills', 'Projects', 'Education', 'Contact'].map((item) => (
              <li key={item}>
                <button
                  className={`text-sm px-3 py-2 rounded-md transition-colors ${
                    activeSection === item.toLowerCase()
                      ? 'text-blue-400 bg-gray-800'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
                  }`}
                  onClick={() => scrollToSection(item.toLowerCase())}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <Header/>



      {/* About */}
      <section id="about" className="py-16 bg-gray-800 bg-opacity-50 relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-blue-400">About Me</h2>
          <div className="bg-gray-700 rounded-lg shadow-lg p-6">
            <p className="text-lg text-gray-300 mb-6 leading-relaxed transition-all duration-1000 ease-in-out transform translate-y-10 opacity-0" style={{ transform: isVisible ? 'translateY(0)' : 'translateY(2rem)', opacity: isVisible ? 1 : 0 }}>
              I'm a passionate React Native and Next.js developer with 5 years of experience building
              cross-platform mobile apps and responsive web applications. I love creating intuitive
              and performant user interfaces that provide great user experiences. My goal is to blend
              creativity with technical expertise to deliver outstanding digital solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-blue-400">Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {['React Native', 'Next.js', 'JavaScript', 'TypeScript', 'Redux', 'GraphQL', 'Node.js', 'Tailwind CSS'].map((skill, index) => (
              <div key={skill} className="bg-gray-700 rounded-lg p-4 text-center shadow-md transition-all duration-500 ease-in-out transform hover:scale-105 hover:bg-gray-600" style={{ transitionDelay: `${index * 100}ms` }}>
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-16 bg-gray-800 bg-opacity-50 relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-blue-400">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Mobile App', icon: Smartphone, description: 'A cross-platform mobile app built with React Native.' },
              { title: 'Web Application', icon: Globe, description: 'A responsive web app developed using Next.js and Tailwind CSS.' },
              { title: 'API Integration', icon: Code, description: 'Seamless integration of RESTful APIs and GraphQL.' }
            ].map((project, index) => (
              <div key={project.title} className="bg-gray-700 rounded-lg overflow-hidden shadow-lg transition-all duration-500 ease-in-out transform hover:scale-105" style={{ transitionDelay: `${index * 200}ms` }}>
                <div className="p-6">
                  <project.icon className="w-12 h-12 text-blue-400 mb-4" />
                  <h3 className="text-xl font-bold mb-2 text-gray-100">{project.title}</h3>
                  <p className="text-gray-300 mb-4">
                    {project.description}
                  </p>
                  <a
                    href="#"
                    className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                  >
                    View Project
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section id="education" className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-blue-400">Education</h2>
          <div className="bg-gray-700 rounded-lg shadow-lg p-6">
            <div className="flex items-start mb-6">
              <GraduationCap className="w-6 h-6 text-blue-400 mr-4" />
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-100">Bachelor of Science in Computer Science</h3>
                <p className="text-gray-300">University of Technology, 2015-2019</p>
              </div>
            </div>
            <div className="flex items-start">
              <Book className="w-6 h-6 text-blue-400 mr-4" />
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-100">Full Stack Web Development Bootcamp</h3>
                <p className="text-gray-300">Tech Academy, 2020</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    <Footer/>
    </main>
  )
}