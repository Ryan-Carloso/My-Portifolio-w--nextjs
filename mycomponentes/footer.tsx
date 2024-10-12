//mycomponentes/footer.tsx

"use client"

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Github, Linkedin, Mail, Code, Smartphone, Globe, GraduationCap, Book } from 'lucide-react'



export default function Footer() {
    return (
        <div>
                  {/* Contact */}
      <section id="contact" className="py-16 bg-gray-800 bg-opacity-50 relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-blue-400">Contact Me</h2>
          <div className="bg-gray-700 rounded-lg shadow-lg p-6">
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
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8 relative z-10">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>&copy; 2023 John Doe. All rights reserved.</p>
        </div>
      </footer>
        </div>
    );
}

