import { Github, Linkedin, Mail, Code, Smartphone, Globe, GraduationCap, Book } from 'lucide-react'

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
                            <div key={project.title} className="bg-gray-700 rounded-lg shadow-lg transition-all duration-500 ease-in-out transform hover:scale-105" style={{ transitionDelay: `${index * 200}ms` }}>
                                <div className="p-6">
                                    <project.icon className="w-12 h-12 text-blue-400 mb-4" />
                                    <h3 className="text-xl font-semibold mb-2 text-white">{project.title}</h3>
                                    <p className="mb-4 text-gray-300">
                                        {project.description}
                                    </p>
                                    <button className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition-colors duration-200">
                                        View Project
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}