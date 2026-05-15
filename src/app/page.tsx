'use client'
import dynamic from 'next/dynamic'
import Header from '@/components/Header'
import Experience from '@/components/Experience'
import Education from '@/components/Education'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import ChatAgent from '@/components/ChatAgent'

const Hero = dynamic(() => import('@/components/Hero'), { ssr: false })

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Experience />
      <Education />
      <Projects />
      <Contact />
      <ChatAgent />
    </main>
  )
}