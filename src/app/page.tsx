import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Projects from '@/components/sections/Projects'
import Experience from '@/components/sections/Experience'
// import Web3Section from '@/components/sections/Web3Section'
import Contact from '@/components/sections/Contact'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      {/* <Web3Section /> */}
      <Contact />
    </div>
  )
}