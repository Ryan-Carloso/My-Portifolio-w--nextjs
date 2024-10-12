import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Linkedin, Mail, Code, Smartphone, Globe, GraduationCap, Book } from 'lucide-react'
import { Button } from "@/components/ui/button"


export default function Projects() {
    return (
        <div>
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
        </div>
    );
}