import React, { lazy, Suspense, useEffect, useState } from 'react'
import MacWindow from './MacWindow'
import './Note.scss'

const Markdown = lazy(() => import('react-markdown'))

const Note = ({ onClose }) => {
  const [markdown, setMarkdown] = useState(null)

  useEffect(() => {
    fetch('/Note.txt')
      .then((res) => res.text())
      .then((text) => setMarkdown(text))
  }, [])

  return (
    <MacWindow title="Note" onClose={onClose}>
      <div className="note-window">
        {markdown ? (
          <Suspense fallback={<p className="loading">Loading…</p>}>
            <Markdown>
              {markdown}
            </Markdown>
          </Suspense>
        ) : (
          <p className="loading">Loading…</p>
        )}
      </div>
    </MacWindow>
  )
}

export default Note