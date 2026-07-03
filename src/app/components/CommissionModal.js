'use client'
import { useState, useEffect, useCallback } from 'react'
import { Squiggle } from './ui'

const inputClass =
  'w-full px-4 py-2.5 rounded-xl bg-transparent border border-(--line) text-(--ink) text-sm outline-none transition-colors duration-200 focus:border-(--ink) placeholder:text-(--ink-soft)'

const selectClass =
  'w-full px-4 py-2.5 rounded-xl bg-(--bg) border border-(--line) text-(--ink) text-sm outline-none transition-colors duration-200 focus:border-(--ink) cursor-pointer appearance-none'

function Field({ label, hint, required, children, className = '' }) {
  return (
    <div className={className}>
      <label className="block font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.18em] text-(--ink-soft) mb-1.5">
        {label}
        {hint && <span className="normal-case tracking-normal ml-1.5 opacity-55">({hint})</span>}
        {required && <span className="ml-0.5 text-(--accent)"> *</span>}
      </label>
      {children}
    </div>
  )
}

export default function CommissionModal({ isOpen, onClose }) {
  const [mounted, setMounted] = useState(false)
  const [show, setShow] = useState(false)

  const [honeypot, setHoneypot] = useState('')
  const [formLoadTime, setFormLoadTime] = useState(null)
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    type: '', size: '', budget: '', message: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  // Enter animation
  useEffect(() => {
    if (isOpen) {
      setMounted(true)
      setFormLoadTime(Date.now())
      requestAnimationFrame(() => requestAnimationFrame(() => setShow(true)))
    } else {
      setShow(false)
      const t = setTimeout(() => {
        setMounted(false)
        setSubmitted(false)
        setError('')
        setForm({ name: '', email: '', phone: '', type: '', medium: '', size: '', budget: '', timeline: '', message: '' })
      }, 380)
      return () => clearTimeout(t)
    }
  }, [isOpen])

  // Escape key
  const handleKey = useCallback((e) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  useEffect(() => {
    if (!isOpen) return
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, handleKey])

  // Scroll lock
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const handleChange = (e) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      const res = await fetch('/api/commission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, honeypot, timestamp: formLoadTime }),
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        const data = await res.json()
        setError(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (!mounted) return null

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px',
        transition: 'background-color 320ms ease, backdrop-filter 320ms ease',
        backgroundColor: show ? 'color-mix(in oklch, var(--ink) 48%, transparent)' : 'transparent',
        backdropFilter: show ? 'blur(6px)' : 'blur(0px)',
        WebkitBackdropFilter: show ? 'blur(6px)' : 'blur(0px)',
      }}
    >
      <div
        style={{
          width: '100%', maxWidth: '640px',
          maxHeight: '92dvh',
          overflowY: 'auto',
          backgroundColor: 'var(--bg)',
          borderRadius: '24px',
          padding: 'clamp(24px, 5vw, 44px)',
          position: 'relative',
          transition: 'opacity 360ms ease, transform 400ms cubic-bezier(0.34, 1.38, 0.64, 1)',
          opacity: show ? 1 : 0,
          transform: show ? 'translateY(0) scale(1)' : 'translateY(32px) scale(0.96)',
          boxShadow: '0 32px 80px color-mix(in oklch, var(--ink) 22%, transparent)',
        }}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-7">
          <div>
            <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-(--ink-soft) m-0 mb-2">
              commission enquiry
            </p>
            <h2 className="font-[family-name:var(--font-display)] font-normal text-[clamp(28px,6vw,40px)] leading-none tracking-[-0.02em] m-0 mb-2">
              Let&apos;s make{' '}
              <em className="italic text-(--accent)">something.</em>
            </h2>
            <Squiggle width={80} opacity={0.35} />
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 ml-4 mt-1 w-9 h-9 rounded-full border border-(--line) flex items-center justify-center text-(--ink-soft) hover:text-(--ink) hover:border-(--ink) transition-colors duration-200 cursor-pointer bg-transparent"
            style={{ fontSize: '16px' }}
          >
            ✕
          </button>
        </div>

        {/* Success state */}
        {submitted ? (
          <div className="text-center py-10">
            <p className="font-[family-name:var(--font-display)] text-[28px] italic text-(--accent) m-0 mb-2">
              thanks! i&apos;ll be in touch soon ✿
            </p>
            <p className="text-sm text-(--ink-soft) m-0">
              Commission enquiry received. Check your inbox for a confirmation.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Honeypot */}
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0, pointerEvents: 'none' }}
              tabIndex="-1"
              autoComplete="off"
              aria-hidden="true"
            />

            {/* Contact row */}
            <div className="grid grid-cols-2 gap-3">
              <Field label="Name" required>
                <input
                  name="name" type="text" value={form.name}
                  onChange={handleChange} placeholder="Your name"
                  required className={inputClass}
                />
              </Field>
              <Field label="Email" required>
                <input
                  name="email" type="email" value={form.email}
                  onChange={handleChange} placeholder="you@email.com"
                  required className={inputClass}
                />
              </Field>
            </div>

            <Field label="Phone" hint="optional">
              <input
                name="phone" type="tel" value={form.phone}
                onChange={handleChange} placeholder="+61 400 000 000"
                className={inputClass}
              />
            </Field>

            {/* Divider */}
            <div className="border-t border-(--line) my-1" />

            {/* Commission detail rows */}
            <Field label="Commission type" required>
              <div className="relative">
                <select name="type" value={form.type} onChange={handleChange} required className={selectClass}>
                  <option value="">Select…</option>
                  <option>Painting</option>
                  <option>Drawing / Illustration</option>
                  <option>Print</option>
                  <option>Mural</option>
                  <option>Home Decor / Object</option>
                  <option>Other</option>
                </select>
                <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-(--ink-soft) text-xs">↓</span>
              </div>
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Size / Dimensions" hint="optional">
                <input
                  name="size" type="text" value={form.size}
                  onChange={handleChange} placeholder="e.g. A3, 60 × 90 cm"
                  className={inputClass}
                />
              </Field>
              <Field label="Budget range" required>
                <input
                  name="budget" type="text" value={form.budget}
                  onChange={handleChange} placeholder="e.g. $500, let's discuss"
                  required className={inputClass}
                />
              </Field>
            </div>

            {/* Divider */}
            <div className="border-t border-(--line) my-1" />

            <Field label="Tell me about your vision" required>
              <textarea
                name="message" value={form.message}
                onChange={handleChange} rows={5} required
                placeholder="Describe the piece — colours, mood, subject, where it'll live, inspiration, anything that helps bring the idea to life…"
                className={`${inputClass} resize-none leading-relaxed`}
              />
            </Field>

            <p className="text-[12px] text-(--ink-soft) m-0 -mt-1">
              Have reference images?{' '}
              <a
                href="mailto:timdyule@gmail.com"
                className="text-(--ink) border-b border-(--line) hover:border-(--ink) transition-colors duration-200 pb-px"
              >
                Email them to timdyule@gmail.com
              </a>{' '}
              after submitting.
            </p>

            {/* Privacy Agreement Checkbox */}
            <div className="flex items-start gap-2.5 mt-1">
              <input
                id="agree-commission"
                type="checkbox"
                required
                className="mt-0.5 shrink-0 accent-(--ink) w-4 h-4 cursor-pointer"
              />
              <label htmlFor="agree-commission" className="text-xs text-(--ink-soft) leading-normal cursor-pointer select-none">
                I agree to the{' '}
                <a
                  href="/terms-and-conditions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-(--ink) border-b border-(--line) hover:border-(--ink) transition-colors duration-200 pb-px font-medium"
                >
                  Terms & Conditions
                </a>{' '}
                and{' '}
                <a
                  href="/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-(--ink) border-b border-(--line) hover:border-(--ink) transition-colors duration-200 pb-px font-medium"
                >
                  Privacy Policy
                </a>.
              </label>
            </div>

            {error && (
              <p className="text-[13px] text-red-600 m-0">{error}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full mt-1 px-6 py-3.5 rounded-full bg-(--ink) text-(--bg) text-[15px] font-medium border-0 cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
            >
              {submitting ? 'Sending…' : 'Send commission enquiry →'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
