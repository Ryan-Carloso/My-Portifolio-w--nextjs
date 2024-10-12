import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Skills() {
    return (
        <div>
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
        </div>
    );
}