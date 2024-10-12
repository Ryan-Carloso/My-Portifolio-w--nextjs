"use client"

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import Footer from '@/mycomponentes/footer';
import Header from '@/mycomponentes/header';
import Contact from '@/mycomponentes/contact';
import About from '@/mycomponentes/about';
import Skills from '@/mycomponentes/skills';
import Projects from '@/mycomponentes/Projects';
import Education from '@/mycomponentes/education';
import SnakeAnimation from '@/mycomponentes/snake'; // Adjust the path as needed

export default function Component() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'education', 'contact'];
      const scrollPosition = window.scrollY;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop - 100) {
          setActiveSection(section);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 relative overflow-hidden">
      <SnakeAnimation /> {/* Use the SnakeAnimation component */}

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
      <Header />

      {/* About */}
      <About />

      {/* Skills */}
      <Skills />

      {/* Projects */}
      <Projects />

      {/* Education */}
      <Education />

      {/* Contact */}
      <Contact />

      <Footer />
    </main>
  );
}
