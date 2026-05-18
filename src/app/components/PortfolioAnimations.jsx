'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function PortfolioAnimations() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined
    }

    const cleanups = []

    const ctx = gsap.context(() => {
      const revealFrom = {
        autoAlpha: 0,
        y: 30,
        scale: 0.985,
        filter: 'blur(6px)',
      }
      const revealTo = {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: 0.78,
        ease: 'power3.out',
        stagger: 0.075,
      }

      gsap.set('[data-hero-reveal]', {
        autoAlpha: 0,
        y: 20,
      })

      gsap.set('[data-hero-image]', {
        autoAlpha: 0,
        scale: 0.98,
        y: 14,
      })

      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .to('[data-hero-reveal]', {
          autoAlpha: 1,
          y: 0,
          duration: 0.72,
          stagger: 0.09,
        })
        .to(
          '[data-hero-image]',
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: 0.82,
          },
          '-=0.46',
        )

      gsap.utils.toArray('[data-animate-section]').forEach((section) => {
        const revealItems = section.querySelectorAll('[data-animate-reveal]')
        const imageItems = section.querySelectorAll('[data-animate-image]')

        if (!revealItems.length && !imageItems.length) {
          return
        }

        ScrollTrigger.create({
          trigger: section,
          start: 'top 88%',
          once: true,
          onEnter: () => {
            const timeline = gsap.timeline()

            if (revealItems.length) {
              timeline.fromTo(revealItems, revealFrom, revealTo)
            }

            if (imageItems.length) {
              timeline.fromTo(
                imageItems,
                {
                  autoAlpha: 0,
                  y: 24,
                  scale: 0.965,
                },
                {
                  autoAlpha: 1,
                  y: 0,
                  scale: 1,
                  duration: 0.82,
                  ease: 'power3.out',
                  stagger: 0.07,
                },
                revealItems.length ? '-=0.48' : 0,
              )
            }
          },
        })
      })

      gsap.utils.toArray('[data-animate-work]').forEach((section) => {
        const tiles = section.querySelectorAll('[data-animate-card]')

        ScrollTrigger.create({
          trigger: section,
          start: 'top 84%',
          once: true,
          onEnter: () => {
            gsap.fromTo(
              tiles,
              {
                autoAlpha: 0,
                y: 42,
                scale: 0.965,
                filter: 'blur(5px)',
              },
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                filter: 'blur(0px)',
                duration: 0.82,
                ease: 'power3.out',
                stagger: 0.08,
              },
            )
          },
        })
      })

      gsap.utils.toArray('[data-animate-stat]').forEach((stat) => {
        ScrollTrigger.create({
          trigger: stat,
          start: 'top 92%',
          once: true,
          onEnter: () => {
            gsap.fromTo(
              stat,
              {
                autoAlpha: 0,
                y: 22,
              },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.58,
                ease: 'power3.out',
              },
            )
          },
        })
      })

      gsap.utils.toArray('[data-animate-card]').forEach((card) => {
        const image = card.querySelector('img')
        const onEnter = () => {
          gsap.to(card, { y: -5, duration: 0.26, ease: 'power2.out' })
          if (image) {
            gsap.to(image, { scale: 1.018, duration: 0.35, ease: 'power2.out' })
          }
        }
        const onLeave = () => {
          gsap.to(card, { y: 0, duration: 0.34, ease: 'power2.out' })
          if (image) {
            gsap.to(image, { scale: 1, duration: 0.4, ease: 'power2.out' })
          }
        }

        card.addEventListener('pointerenter', onEnter)
        card.addEventListener('pointerleave', onLeave)

        cleanups.push(() => {
          card.removeEventListener('pointerenter', onEnter)
          card.removeEventListener('pointerleave', onLeave)
        })
      })

      requestAnimationFrame(() => ScrollTrigger.refresh())
      window.addEventListener('load', ScrollTrigger.refresh)
      cleanups.push(() => window.removeEventListener('load', ScrollTrigger.refresh))
    })

    return () => {
      cleanups.forEach((cleanup) => cleanup())
      ctx.revert()
    }
  }, [])

  return null
}
