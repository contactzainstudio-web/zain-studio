import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useRef } from 'react'
import { Button, Reveal, SectionHeading } from '../components/ui'
import { PROJECTS, SITE, type Project } from '../data/site'

export function Work() {
  return (
    <section id="work" className="work theme-ink section" aria-label="Selected work">
      <div className="container">
        <SectionHeading
          eyebrow="Selected work"
          title={[<>Built to perform,</>, <>designed to be remembered.</>]}
          text="Live products, apps and creative work — e-commerce, logistics, health media, analytics, video and brand design."
          cta={
            <div className="work__drive">
              <a href={SITE.driveVideo} target="_blank" rel="noopener noreferrer" className="link link--orange mono">
                Video reel ↗
              </a>
              <a href={SITE.driveGraphics} target="_blank" rel="noopener noreferrer" className="link link--orange mono">
                Graphic design ↗
              </a>
            </div>
          }
        />

        <div className="work__grid">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>

        <Reveal className="work__more">
          <Button href="#contact" variant="ghost">
            Your project could be next
          </Button>
        </Reveal>
      </div>
    </section>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  const Wrapper = project.url ? motion.a : motion.div
  const linkProps = project.url ? { href: project.url, target: '_blank', rel: 'noopener noreferrer' } : {}

  return (
    <motion.article
      ref={ref}
      className={`project project--${project.size}`}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay: (index % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Wrapper className="project__media" data-cursor={project.url ? (project.url.includes('drive.google') ? 'open' : 'view') : undefined} {...linkProps} aria-label={project.url ? `Open ${project.title}` : undefined}>
        <motion.img
          src={project.image}
          alt={`${project.title} — ${project.tagline}`}
          loading="lazy"
          decoding="async"
          width={1200}
          height={800}
          style={{ y: imgY }}
        />
        <span className="project__badge mono">{project.year}</span>
        <span className="project__shine" aria-hidden />
      </Wrapper>

      <div className="project__meta">
        <div className="project__row">
          <span className="project__cat mono accent">{project.category}</span>
          <span className="project__num mono muted">0{index + 1}</span>
        </div>
        <h3 className="project__title heading-1">
          {project.url ? (
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="project__title-link">
              {project.title}
              <ArrowUpRight className="project__title-arrow" size={22} strokeWidth={1.8} aria-hidden />
            </a>
          ) : (
            project.title
          )}
        </h3>
        <p className="project__tagline muted">{project.tagline}</p>
        <p className="project__desc">{project.description}</p>
        <ul className="project__tech" aria-label="Technologies">
          {project.tech.map((t) => (
            <li key={t} className="mono">
              {t}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  )
}
