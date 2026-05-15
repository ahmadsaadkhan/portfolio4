'use client'
import { motion } from 'framer-motion'
import { portfolioData } from '@/data/portfolio'

export default function Experience() {
  const { experience } = portfolioData

  return (
    <section id="experience" style={{ padding: '8rem 1.5rem', maxWidth: '800px', margin: '0 auto' }}>

      <motion.div
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.6 }}
        style={{ marginBottom: '4rem' }}
      >
        <p style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
          02. Career
        </p>
        <h2 style={{ fontFamily: 'var(--mono)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, color: 'var(--text)' }}>
          Experience
        </h2>
      </motion.div>

      <div style={{ position: 'relative', paddingLeft: '2rem' }}>
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0,
          width: '1px', background: 'linear-gradient(to bottom, var(--accent), var(--border) 80%, transparent)',
        }} />

        {experience.map((job, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.04 }}
            style={{ position: 'relative', marginBottom: '2.5rem' }}
          >
            {/* Dot */}
            <div style={{
              position: 'absolute', left: '-2.45rem', top: '1.6rem',
              width: 9, height: 9, borderRadius: '50%',
              background: job.current ? 'var(--accent)' : 'var(--bg)',
              border: `1px solid ${job.current ? 'var(--accent)' : 'var(--border)'}`,
              boxShadow: job.current ? '0 0 10px var(--accent)' : 'none',
            }} />

            <div
              style={{
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: '4px', padding: '1.5rem', transition: 'border-color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.9rem' }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: '1.05rem', color: 'var(--text)' }}>
                    {job.title}
                  </h3>
                  <p style={{ fontFamily: 'var(--mono)', fontSize: '0.78rem', color: 'var(--accent)', marginTop: '0.2rem' }}>
                    {job.company}
                    {job.location && <span style={{ color: 'var(--muted)' }}> · {job.location}</span>}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                  {job.current && (
                    <span style={{
                      fontFamily: 'var(--mono)', fontSize: '0.58rem', textTransform: 'uppercase',
                      color: 'var(--bg)', background: 'var(--accent)',
                      padding: '0.18rem 0.5rem', borderRadius: '2px', letterSpacing: '0.08em',
                    }}>Current</span>
                  )}
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', color: 'var(--muted)', whiteSpace: 'nowrap' }}>
                    {job.period}
                  </span>
                </div>
              </div>

              <ul style={{ marginBottom: '1rem' }}>
                {job.points.map((p, j) => (
                  <li key={j} style={{ display: 'flex', gap: '0.6rem', fontFamily: 'var(--sans)', fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '0.35rem', listStyle: 'none' }}>
                    <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '0.05rem' }}>▸</span>
                    {p}
                  </li>
                ))}
              </ul>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {job.stack.map(s => (
                  <span key={s} style={{
                    fontFamily: 'var(--mono)', fontSize: '0.62rem', letterSpacing: '0.05em',
                    color: 'var(--muted)', border: '1px solid var(--border)', padding: '0.18rem 0.55rem', borderRadius: '2px',
                  }}>{s}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}