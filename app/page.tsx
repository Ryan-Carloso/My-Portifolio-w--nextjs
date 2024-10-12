"use client"

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Github, Linkedin, Mail, Code, Smartphone, Globe, GraduationCap, Book } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Footer from '@/mycomponentes/footer'

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

      const newHead = {
        x: snake[0].x + direction.x * CELL_SIZE,
        y: snake[0].y + direction.y * CELL_SIZE
      }

      newHead.x = (newHead.x + CANVAS_WIDTH) % CANVAS_WIDTH
      newHead.y = (newHead.y + CANVAS_HEIGHT) % CANVAS_HEIGHT

      snake.unshift(newHead)
      snake.pop()
    }

    const drawSnake = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      snake.forEach((segment, index) => {
        const alpha = 1 - (index / SNAKE_LENGTH)
        ctx.fillStyle = `rgba(59, 130, 246, ${alpha * 0.5})`
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
                <Button
                  variant="ghost"
                  className={`text-sm ${activeSection === item.toLowerCase() ? 'text-blue-400' : 'text-gray-400'}`}
                  onClick={() => scrollToSection(item.toLowerCase())}
                >
                  {item}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Header */}
      <header id="home" className="container mx-auto px-4 py-24 md:py-32 relative z-10">
        <div className="flex flex-col items-center md:flex-row md:justify-between">
          <div className="mb-6 md:mb-0 transition-all duration-1000 ease-in-out transform translate-y-10 opacity-0" style={{ transform: isVisible ? 'translateY(0)' : 'translateY(2rem)', opacity: isVisible ? 1 : 0 }}>
            <h1 className="text-4xl font-bold mb-2 text-blue-400">Ryan Costa</h1>
            <p className="text-xl text-gray-300">Software Developer</p>
            <div className="flex flex-wrap space-y-2 md:space-y-0 md:space-x-2 mt-4">
              {['React', 'React Native', 'Node.js', 'TypeScript', 'Python', 'Scraping', 'Supabase', 'Firebase'].map((stack) => (
                <span key={stack} className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm transition-colors duration-200 hover:bg-gray-600 hover:text-white">
                  {stack}
                </span>
              ))}
            </div>
          </div>
          <div className="relative w-40 h-40 transition-all duration-1000 delay-300 ease-in-out transform scale-0" style={{ transform: isVisible ? 'scale(1)' : 'scale(0)' }}>
            <Image
              src="/ryan01.jpg"
              alt="Profile Picture"
              layout="fill"
              className="rounded-full border-4 border-blue-400 shadow-lg"
            />
          </div>
        </div>
      </header>

      {/* About */}
      <section id="about" className="py-16 bg-gray-800 bg-opacity-50 relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-blue-400">About Me</h2>
          <Card>
            <CardContent className="p-6">
              <p className="text-lg text-gray-300 mb-6 leading-relaxed transition-all duration-1000 ease-in-out transform translate-y-10 opacity-0" style={{ transform: isVisible ? 'translateY(0)' : 'translateY(2rem)', opacity: isVisible ? 1 : 0 }}>
                I'm a passionate React Native and Next.js developer with 5 years of experience building
                cross-platform mobile apps and responsive web applications. I love creating intuitive
                and performant user interfaces that provide great user experiences. My goal is to blend
                creativity with technical expertise to deliver outstanding digital solutions.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-blue-400">Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {['React Native', 'Next.js', 'JavaScript', 'TypeScript', 'Redux', 'GraphQL', 'Node.js', 'Tailwind CSS'].map((skill, index) => (
              <Card key={skill} className="transition-all duration-500 ease-in-out transform hover:scale-105" style={{ transitionDelay: `${index * 100}ms` }}>
                <CardContent className="p-4 text-center">
                  {skill}
                </CardContent>
              </Card>
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
              <Card key={project.title} className="transition-all duration-500 ease-in-out transform hover:scale-105" style={{ transitionDelay: `${index * 200}ms` }}>
                <CardContent className="p-6">
                  <project.icon className="w-12 h-12 text-blue-400 mb-4" />
                  <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
                  <CardDescription className="mb-4">
                    {project.description}
                  </CardDescription>
                  <Button variant="secondary">View Project</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section id="education" className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-blue-400">Education</h2>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start mb-6">
                <GraduationCap className="w-6 h-6 text-blue-400 mr-4" />
                <div>
                  <CardTitle className="text-xl mb-2">Bachelor of Science in Computer Science</CardTitle>
                  <CardDescription>University of Technology, 2015-2019</CardDescription>
                </div>
              </div>
              <div className="flex items-start">
                <Book className="w-6 h-6 text-blue-400 mr-4" />
                <div>
                  <CardTitle className="text-xl mb-2">Full Stack Web Development Bootcamp</CardTitle>
                  <CardDescription>Tech Academy, 2020</CardDescription>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 bg-gray-800 bg-opacity-50 relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-blue-400">Contact Me</h2>
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-center space-x-6">
                {[
                  { icon: Github, href: '#', label: 'GitHub' },
                  { icon: Linkedin, href: '#', label: 'LinkedIn' },
                  { icon: Mail, href: '#', label: 'Email' }
                ].map((item, index) => (
                  <a key={item.label} href={item.href} className="text-blue-400 hover:text-blue-300 transition-all duration-300 ease-in-out transform hover:scale-110" style={{ transitionDelay: `${index * 100}ms` }} aria-label={item.label}>
                    <item.icon size={24} />
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </main>
  )
}