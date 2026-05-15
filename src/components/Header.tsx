'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { portfolioData } from '@/data/portfolio'
import ThemeToggle from '@/components/ThemeToggle'

const navLinks = [
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const { main } = portfolioData

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on resize to desktop
  useEffect(() => {
    if (!isMobile) setMenuOpen(false)
  }, [isMobile])

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '0 2rem', height: '64px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(0,0,0,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Logo */}
      <a href="#" style={{
        fontFamily: 'var(--mono)', fontSize: '0.9rem',
        color: 'var(--accent)', letterSpacing: '0.05em', zIndex: 2,
      }}>
        AS<span style={{ color: 'var(--muted)' }}>.dev</span>
      </a>

      {/* ── DESKTOP NAV — only visible above 768px ── */}
      {!isMobile && (
        <nav style={{
          display: 'flex', alignItems: 'center', gap: '1.8rem',
        }}>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}
              style={{
                fontFamily: 'var(--mono)', fontSize: '0.72rem', letterSpacing: '0.1em',
                color: 'var(--muted)', textTransform: 'uppercase', transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
            >
              {link.label}
            </a>
          ))}

          <ThemeToggle />

          <a href={main.resumeDownload} download target="_blank"
            style={{
              fontFamily: 'var(--mono)', fontSize: '0.72rem', letterSpacing: '0.1em',
              color: 'var(--bg)', background: 'var(--accent)',
              padding: '0.45rem 1.1rem', borderRadius: '2px', textTransform: 'uppercase',
              transition: 'opacity 0.2s', whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Resume
          </a>
        </nav>
      )}

      {/* ── MOBILE RIGHT SIDE — theme toggle + hamburger ── */}
      {isMobile && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <ThemeToggle />

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '4px', display: 'flex', flexDirection: 'column',
              justifyContent: 'center', gap: '5px',
            }}
          >
            <span style={{
              display: 'block', width: 22, height: 2,
              background: menuOpen ? 'var(--accent)' : 'var(--text)',
              borderRadius: 2, transition: 'all 0.3s',
              transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
            }} />
            <span style={{
              display: 'block', width: 22, height: 2,
              background: menuOpen ? 'var(--accent)' : 'var(--text)',
              borderRadius: 2, transition: 'all 0.3s',
              opacity: menuOpen ? 0 : 1,
            }} />
            <span style={{
              display: 'block', width: 22, height: 2,
              background: menuOpen ? 'var(--accent)' : 'var(--text)',
              borderRadius: 2, transition: 'all 0.3s',
              transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
            }} />
          </button>
        </div>
      )}

      {/* ── MOBILE DROPDOWN MENU ── */}
      <AnimatePresence>
        {menuOpen && isMobile && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute', top: '64px', left: 0, right: 0,
              background: 'var(--surface)',
              borderBottom: '1px solid var(--border)',
              padding: '1.5rem 2rem',
              display: 'flex', flexDirection: 'column', gap: '1.4rem',
            }}
          >
            {navLinks.map(link => (
              <a key={link.href} href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: 'var(--mono)', fontSize: '0.85rem',
                  color: 'var(--text)', textTransform: 'uppercase',
                  letterSpacing: '0.1em', transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text)')}
              >
                {link.label}
              </a>
            ))}

            <div style={{ height: '1px', background: 'var(--border)' }} />

            <a href={main.resumeDownload} download target='_blank'
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: 'var(--mono)', fontSize: '0.85rem',
                color: 'var(--accent)', textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              Resume ↓
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}