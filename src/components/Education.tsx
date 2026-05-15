'use client'
import { motion } from 'framer-motion'
import { portfolioData } from '@/data/portfolio'

export default function Education() {
  const { education } = portfolioData

  return (
    <section id="education" style={{ padding: '2rem 1.5rem 8rem', maxWidth: '800px', margin: '0 auto' }}>

      <motion.div
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.6 }}
        style={{ marginBottom: '3rem' }}
      >
        <p style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
          03. Academic
        </p>
        <h2 style={{ fontFamily: 'var(--mono)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, color: 'var(--text)' }}>
          Education
        </h2>
      </motion.div>

      <div style={{ display: 'grid', gap: '1.2rem' }}>
        {education.map((edu, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: '4px', padding: '2rem',
              display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem',
              flexWrap: 'wrap', transition: 'border-color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
          >
            <div style={{ flex: 1 }}>
              <h3 style={{ fontFamily: 'var(--sans)', fontSize: '1.1rem', fontWeight: 600, color: 'var(--text)', marginBottom: '0.35rem' }}>
                {edu.degree}
              </h3>
              <p style={{ fontFamily: 'var(--mono)', fontSize: '0.78rem', color: 'var(--accent)', marginBottom: '0.85rem' }}>
                {edu.institution}
                <span style={{ color: 'var(--muted)' }}> · {edu.location}</span>
              </p>
              <p style={{ fontFamily: 'var(--sans)', fontSize: '0.87rem', color: 'var(--muted)', lineHeight: 1.7 }}>
                {edu.note}
              </p>
            </div>
            <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem', flexShrink: 0 }}>
              {edu.current && (
                <span style={{
                  fontFamily: 'var(--mono)', fontSize: '0.58rem', textTransform: 'uppercase',
                  color: 'var(--bg)', background: 'var(--accent)',
                  padding: '0.18rem 0.5rem', borderRadius: '2px', letterSpacing: '0.08em',
                }}>Ongoing</span>
              )}
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--muted)', whiteSpace: 'nowrap' }}>
                {edu.period}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}