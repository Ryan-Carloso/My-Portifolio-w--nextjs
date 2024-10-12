import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Linkedin, Mail, Code, Smartphone, Globe, GraduationCap, Book } from 'lucide-react'

export default function Education() {
    return (
        <div>
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
        </div>
    );
}