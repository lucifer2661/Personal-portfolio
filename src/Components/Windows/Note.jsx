import React, { useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import MacWindow from './MacWindow'
 import './Note.scss'


const Note = ({onClose}) => {
  const [markdown, setMarkdown] = useState(null)

  useEffect(() => {
    fetch('/Note.txt')
      .then((res) => res.text())
      .then((text) => setMarkdown(text))
  }, [])

  return (
    <MacWindow title="Note"onClose={onClose}>
      <div className="note-window">
        {markdown ? (
          <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
        ) : (
          <p className="loading">Loading…</p>
        )}
      </div>
    </MacWindow>
  )
}

export default Note