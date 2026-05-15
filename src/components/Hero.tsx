'use client'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import { portfolioData } from '@/data/portfolio'

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { main, skills } = portfolioData

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(canvas.clientWidth, canvas.clientHeight)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 100)
    camera.position.z = 4

    const count = 2400
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i++) positions[i] = (Math.random() - 0.5) * 14

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const material = new THREE.PointsMaterial({
      size: 0.016, color: new THREE.Color('#00f5d4'),
      transparent: true, opacity: 0.55, sizeAttenuation: true,
    })

    const particles = new THREE.Points(geometry, material)
    scene.add(particles)

    let mouseX = 0, mouseY = 0
    const onMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.5
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.5
    }
    window.addEventListener('mousemove', onMouse)

    let animId: number
    let elapsed = 0
    let lastTime = performance.now()

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const now = performance.now()
      elapsed += (now - lastTime) / 1000
      lastTime = now
      particles.rotation.y = elapsed * 0.035 + mouseX
      particles.rotation.x = elapsed * 0.018 - mouseY
      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      renderer.setSize(canvas.clientWidth, canvas.clientHeight)
      camera.aspect = canvas.clientWidth / canvas.clientHeight
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', onResize)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  // Show first 7 skills as chips
  const heroSkills = skills.slice(0, 7)

  return (
    <section id="hero" style={{
      position: 'relative', minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
    }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }} />

      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(0,245,212,0.055) 0%, transparent 70%)',
      }} />

      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 1.5rem', maxWidth: '820px' }}>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
          style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', color: 'var(--accent)', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '1.5rem' }}
        >
          {main.occupation}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7 }}
          style={{
            fontFamily: 'var(--mono)', fontWeight: 700,
            fontSize: 'clamp(3rem, 9vw, 5.8rem)', lineHeight: 1.04,
            letterSpacing: '-0.025em', color: 'var(--text)', marginBottom: '1.5rem',
          }}
        >
          {main.name.split(' ')[0]}<br />
          <span style={{ color: 'var(--accent)' }}>{main.name.split(' ')[1]}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }}
          style={{
            fontFamily: 'var(--sans)', fontSize: 'clamp(0.95rem, 2.2vw, 1.15rem)',
            color: 'var(--muted)', lineHeight: 1.8, maxWidth: '520px', margin: '0 auto 2.5rem',
          }}
        >
          {main.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85, duration: 0.6 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', justifyContent: 'center', marginBottom: '2.8rem' }}
        >
          {heroSkills.map((s, i) => (
            <motion.span key={s}
              initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.85 + i * 0.07 }}
              style={{
                fontFamily: 'var(--mono)', fontSize: '0.68rem', letterSpacing: '0.05em',
                color: 'var(--accent)', border: '1px solid var(--accent)',
                padding: '0.28rem 0.75rem', borderRadius: '2px', background: 'var(--accent-dim)',
              }}
            >
              {s}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.5 }}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <a href="#contact" style={{
            fontFamily: 'var(--mono)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em',
            background: 'var(--accent)', color: 'var(--bg)', padding: '0.8rem 2.2rem', borderRadius: '2px', transition: 'opacity 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.82')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Get in Touch
          </a>
          <a href="#projects" style={{
            fontFamily: 'var(--mono)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em',
            border: '1px solid var(--border)', color: 'var(--text)',
            padding: '0.8rem 2.2rem', borderRadius: '2px', transition: 'border-color 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
          >
            View Projects
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
          style={{ position: 'absolute', bottom: '-130px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}
        >
          <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--muted)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            style={{ width: 1, height: 42, background: 'linear-gradient(to bottom, var(--accent), transparent)' }}
          />
        </motion.div>
      </div>
    </section>
  )
}