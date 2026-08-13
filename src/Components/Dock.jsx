import React, { useRef, useState, useEffect } from 'react'
import "./Dock.scss"

const icons = [
  { name: 'github',   src: '/Docs-icon/github.svg',   alt: 'GitHub' },
  { name: 'note',     src: '/Docs-icon/note.svg',     alt: 'Note' },
  { name: 'calendar', src: '/Docs-icon/calender.svg', alt: 'Calendar' },
  { name: 'cli',      src: '/Docs-icon/cli.svg',      alt: 'CLI' },
  { name: 'link',     src: '/Docs-icon/link.svg',     alt: 'Link' },
  { name: 'spotify',  src: '/Docs-icon/spotify.svg',  alt: 'Spotify' },
  { name: 'pdf',      src: '/Docs-icon/pdf.svg',      alt: 'PDF' },
  { name: 'mail',     src: '/Docs-icon/mail.svg',     alt: 'Mail' },
]

// In-app windows (rendered via MacWindow)
const WINDOW_MAP = {
  github:  'Github',
  note:    'Note',
  pdf:     'Pdf',
  spotify: 'Spotify',
  cli:     'Cli',
}

// Icons that open something outside the app instead of a window
const EXTERNAL_LINKS = {
  calendar: 'https://calendar.google.com',
  link:     'https://linkedin.com/in/aditya-thakur-615b75194',
  mail:     'mailto:adityathakur2661@example.com',
}

// Tuning knobs
const MAX_SCALE = 1.6
const BASE_SCALE = 1.0
const INFLUENCE = 130
const LIFT = 14

const Dock = ({ setWindowState }) => {
  const dockRef = useRef(null)
  const iconRefs = useRef([])
  const rafRef = useRef(null)
  const [scales, setScales] = useState(icons.map(() => BASE_SCALE))
  const [bouncing, setBouncing] = useState(null)

  const handleMouseMove = (e) => {
    const mouseX = e.clientX
    if (rafRef.current) cancelAnimationFrame(rafRef.current)

    rafRef.current = requestAnimationFrame(() => {
      const newScales = iconRefs.current.map((el) => {
        if (!el) return BASE_SCALE
        const rect = el.getBoundingClientRect()
        const iconCenterX = rect.left + rect.width / 2
        const distance = Math.abs(mouseX - iconCenterX)

        if (distance > INFLUENCE) return BASE_SCALE
        const falloff = Math.cos((distance / INFLUENCE) * (Math.PI / 2))
        return BASE_SCALE + (MAX_SCALE - BASE_SCALE) * falloff
      })
      setScales(newScales)
    })
  }

  const handleMouseLeave = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    setScales(icons.map(() => BASE_SCALE))
  }

  const handleClick = (name) => {
    setBouncing(name)
    setTimeout(() => setBouncing(null), 600)

    if (EXTERNAL_LINKS[name]) {
      window.open(EXTERNAL_LINKS[name], '_blank', 'noopener,noreferrer')
      return
    }

    const windowKey = WINDOW_MAP[name]
    if (windowKey && setWindowState) {
      setWindowState((prev) => ({ ...prev, [windowKey]: !prev[windowKey] }))
    }
  }

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <footer
      className="dock"
      ref={dockRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {icons.map((icon, i) => {
        const scale = scales[i]
        const liftAmount =
          ((scale - BASE_SCALE) / (MAX_SCALE - BASE_SCALE)) * LIFT

        const leftScale = scales[i - 1] ?? BASE_SCALE
        const rightScale = scales[i + 1] ?? BASE_SCALE
        const pushX = (leftScale - rightScale) * 6

        return (
          <div
            key={icon.name}
            className={`icon ${icon.name} ${bouncing === icon.name ? 'bounce' : ''}`}
            ref={(el) => (iconRefs.current[i] = el)}
            style={{
              transform: `translateX(${pushX}px) translateY(-${liftAmount}px) scale(${scale})`,
            }}
            onClick={() => handleClick(icon.name)}
          >
            <span className="tooltip">{icon.alt}</span>
            <img src={icon.src} alt={icon.alt} draggable="false" />
          </div>
        )
      })}
    </footer>
  )
}

export default Dock