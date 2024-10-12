import { Github, Linkedin, Mail, Code, Smartphone, Globe, GraduationCap, Book } from 'lucide-react'

export default function Education() {
    return (
        <div>
            <section id="education" className="py-16 relative z-10">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8 text-blue-400">Education</h2>
                    <div className="bg-gray-800 rounded-lg shadow-lg">
                        <div className="p-6">
                            <div className="flex items-start mb-6">
                                <GraduationCap className="w-6 h-6 text-blue-400 mr-4 flex-shrink-0" />
                                <div>
                                    <h3 className="text-xl font-semibold mb-2 text-white">Bachelor of Science in Computer Science</h3>
                                    <p className="text-gray-300">University of Technology, 2015-2019</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <Book className="w-6 h-6 text-blue-400 mr-4 flex-shrink-0" />
                                <div>
                                    <h3 className="text-xl font-semibold mb-2 text-white">Full Stack Web Development Bootcamp</h3>
                                    <p className="text-gray-300">Tech Academy, 2020</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}