import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Linkedin, Mail, Code, Smartphone, Globe, GraduationCap, Book } from 'lucide-react'


export default function Contact() {
    return (
        <div>
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
        </div>
    );
}