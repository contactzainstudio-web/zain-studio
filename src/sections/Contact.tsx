import emailjs from '@emailjs/browser'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, Check, Loader2 } from 'lucide-react'
import { useRef, useState, type FormEvent } from 'react'
import { Button, Reveal, SplitLines } from '../components/ui'
import { SITE } from '../data/site'

type Status = 'idle' | 'sending' | 'sent' | 'error'

/**
 * Final CTA + contact form. Dark, cinematic, with a slow-drifting Z mark
 * behind large typography.
 */
export function Contact() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const markY = useTransform(scrollYProgress, [0, 1], ['30%', '-10%'])
  const markRotate = useTransform(scrollYProgress, [0, 1], [-12, 8])
  const [status, setStatus] = useState<Status>('idle')
  const [showForm, setShowForm] = useState(false)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    setStatus('sending')
    try {
      await emailjs.send(
        SITE.emailjs.serviceId,
        SITE.emailjs.templateId,
        {
          from_name: fd.get('name') || '',
          from_email: fd.get('email') || '',
          service_type: fd.get('service') || '',
          budget: fd.get('budget') || '',
          message: fd.get('message') || '',
        },
        SITE.emailjs.publicKey,
      )
      setStatus('sent')
      form.reset()
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error')
    }
  }

  return (
    <section id="contact" ref={ref} className="cta theme-dark section" aria-label="Contact">
      <motion.img
        src="/brand/zain-logo-tight.png"
        alt=""
        className="cta__mark"
        style={{ y: markY, rotate: markRotate }}
        aria-hidden
        loading="lazy"
        width={900}
        height={900}
      />
      <div className="container cta__inner">
        <Reveal y={16}>
          <span className="eyebrow accent">Start a project</span>
        </Reveal>
        <SplitLines
          as="h2"
          className="display-hero cta__title"
          lines={[<>Have an idea?</>, <>Let's <span className="accent">build it.</span></>]}
        />

        <div className="cta__row">
          <Reveal delay={0.1}>
            <p className="lead muted cta__text">
              Tell us about your product, brand or campaign. We reply within one business day
              with a clear next step.
            </p>
          </Reveal>
          <Reveal delay={0.2} className="cta__actions">
            <Button onClick={() => setShowForm(true)}>Start a Project</Button>
            <a href={`mailto:${SITE.email}`} className="link link--orange cta__mail">
              {SITE.email}
            </a>
          </Reveal>
        </div>

        <motion.div
          className="cta__form-wrap"
          initial={false}
          animate={{ height: showForm ? 'auto' : 0, opacity: showForm ? 1 : 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden={!showForm}
        >
          <form className="form" onSubmit={onSubmit} noValidate={false}>
            <div className="form__grid">
              <label className="field">
                <span className="field__label mono">Full name</span>
                <input name="name" type="text" required autoComplete="name" placeholder="Your name" />
              </label>
              <label className="field">
                <span className="field__label mono">Email</span>
                <input name="email" type="email" required autoComplete="email" placeholder="you@company.com" />
              </label>
              <label className="field">
                <span className="field__label mono">Service</span>
                <select name="service" defaultValue="Website Development" required>
                  <option>Website Development</option>
                  <option>Mobile App Development</option>
                  <option>UI/UX Design</option>
                  <option>Graphic Design</option>
                  <option>Video Editing</option>
                  <option>Digital Marketing</option>
                  <option>Full Agency Package</option>
                </select>
              </label>
              <label className="field">
                <span className="field__label mono">Estimated budget</span>
                <select name="budget" defaultValue="" required>
                  <option value="" disabled>
                    Select a range
                  </option>
                  <option>Under $1,000</option>
                  <option>$1,000 – $5,000</option>
                  <option>$5,000 – $15,000</option>
                  <option>$15,000+</option>
                </select>
              </label>
              <label className="field field--full">
                <span className="field__label mono">Project brief</span>
                <textarea name="message" rows={5} required placeholder="What are we building?" />
              </label>
            </div>
            <div className="form__foot">
              <button type="submit" className="btn" disabled={status === 'sending'} data-cursor="hide">
                <span className="btn__fill" aria-hidden />
                <span>
                  {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Sent — talk soon' : 'Send brief'}
                </span>
                <span className="btn__icon" aria-hidden>
                  {status === 'sending' ? (
                    <Loader2 size={16} className="spin" />
                  ) : status === 'sent' ? (
                    <Check size={16} />
                  ) : (
                    <ArrowUpRight size={16} strokeWidth={2.2} />
                  )}
                </span>
              </button>
              {status === 'error' && (
                <p className="form__msg" role="alert">
                  Something went wrong. Email us directly at{' '}
                  <a href={`mailto:${SITE.email}`} className="link link--orange">
                    {SITE.email}
                  </a>
                </p>
              )}
              {status === 'sent' && (
                <p className="form__msg form__msg--ok" role="status">
                  Thanks — your brief is in. We'll reply within one business day.
                </p>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
