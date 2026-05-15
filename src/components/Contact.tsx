'use client'
import { motion } from 'framer-motion'
import { portfolioData } from '@/data/portfolio'

export default function Contact() {
  const { contact, main } = portfolioData

  return (
    <section id="contact" style={{
      padding: '4rem 1.5rem 8rem', maxWidth: '800px', margin: '0 auto',
      borderTop: '1px solid var(--border)',
    }}>

      <motion.div
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', marginBottom: '4rem' }}
      >
        <p style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
          05. What&apos;s Next
        </p>
        <h2 style={{ fontFamily: 'var(--mono)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, color: 'var(--text)', marginBottom: '1.2rem' }}>
          Get In Touch
        </h2>
        <p style={{ fontFamily: 'var(--sans)', fontSize: '1rem', color: 'var(--muted)', maxWidth: '440px', margin: '0 auto', lineHeight: 1.8 }}>
          {contact.message}
        </p>
      </motion.div>

      <div style={{ display: 'grid', gap: '0.9rem', marginBottom: '4rem' }}>
        {contact.links.map((link, i) => (
          <motion.a key={i} href={link.href}
            target={link.href.startsWith('mailto') ? undefined : '_blank'}
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: '4px', padding: '1.2rem 1.5rem', textDecoration: 'none',
              transition: 'border-color 0.2s, background 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.background = 'var(--accent-dim)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--surface)' }}
          >
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              {link.label}
            </span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.78rem', color: 'var(--accent)' }}>
              {link.value} →
            </span>
          </motion.a>
        ))}
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        viewport={{ once: true }} transition={{ delay: 0.5 }}
        style={{ textAlign: 'center', paddingTop: '3rem', borderTop: '1px solid var(--border)' }}
      >
        <p style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', color: 'var(--muted)', letterSpacing: '0.08em' }}>
          Designed & Built by{' '}
          <span style={{ color: 'var(--accent)' }}>{main.name}</span>{' '}
          · {new Date().getFullYear()}
        </p>
      </motion.div>
    </section>
  )
}