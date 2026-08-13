import React, { useState, useRef, useEffect } from 'react'
import MacWindow from './MacWindow'
import './cli.scss'

const Cli = ({ onClose }) => {
  const lastLogin = new Date().toString().replace(/GMT.*/, '').trim()
  const [history, setHistory] = useState([
    { type: 'output', text: `Last login: ${lastLogin} on ttys000` },
  ])
  const [input, setInput] = useState('')
  const [cmdHistory, setCmdHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef(null)
  const bottomRef = useRef(null)

  const promptLabel = 'aditya@MacBook-Pro ~ %'

  const commands = {
    help: {
      description: 'Show a list of available commands.',
      fn: () =>
        Object.entries(commands)
          .map(([name, cmd]) => `${name.padEnd(10)} - ${cmd.description}`)
          .join('\n'),
    },
    clear: {
      description: 'Empty the terminal window.',
      fn: () => null, // handled specially below
    },
    about: {
      description: 'Who is Aditya?',
      fn: () =>
        [
          'Aditya Thakur — B.Tech CS grad (Chandigarh University, 2026).',
          'Based in Chandigarh, originally from Himachal Pradesh.',
          'Backend intern @ Medoc Health.',
          "Currently looking for an SDE role. Try 'sudo hire-me'.",
        ].join('\n'),
    },
    skills: {
      description: 'List core tech stack',
      fn: () =>
        [
          'Frontend   : React',
          'Backend    : Node.js, Express',
          'Database   : PostgreSQL, Prisma, MongoDB',
          'DSA        : C++',
          'Infra      : AWS EC2, Docker, Kubernetes, Jest',
        ].join('\n'),
    },
    projects: {
      description: 'List projects (usage: projects --verbose)',
      fn: (args) =>
        args[0] === '--verbose'
          ? [
              '1. TeamSync         — AI-powered team management SaaS (React)',
              '2. Portfolio OS     — this macOS-style terminal + windows (React)',
              '3. Subscription Tkr — Expo/React Native, NativeWind, Tailwind v4',
              '4. Inventory Sys    — role-based auth',
              '5. Perplexity Clone — rebuilding with real RAG + LangGraph',
              '6. Sandbox IDE      — containerized code exec, AI preview, file explorer',
              '7. OpenSeaDragon    — OSS, 2 merged contributions',
            ].join('\n')
          : [
              '1. TeamSync  2. Portfolio OS  3. Subscription Tracker',
              '4. Inventory System  5. Perplexity Clone  6. Sandbox IDE  7. OpenSeaDragon (OSS)',
              '',
              "Run 'projects --verbose' for details.",
            ].join('\n'),
    },
    contact: {
      description: 'Get in touch',
      fn: () =>
        [
          'GitHub   : github.com/lucifer2661',
          'LinkedIn : linkedin.com/in/aditya-thakur-615b75194',
        ].join('\n'),
    },
    whoami: {
      description: 'Quick identity check',
      fn: () => 'aditya — aspiring SDE.',
    },
    sudo: {
      description: "Try 'sudo hire-me'",
      fn: (args) =>
        args[0] === 'hire-me'
          ? "Permission granted. Check 'contact' for my details — let's talk!"
          : `sudo: ${args[0] || ''}: command not found. Nice try though.`,
    },
  }

  const runCommand = (raw) => {
    const trimmed = raw.trim()
    const newHistoryLine = { type: 'input', text: `${promptLabel} ${raw}` }

    if (trimmed === '') {
      setHistory((prev) => [...prev, newHistoryLine])
      return
    }

    const [cmdName, ...args] = trimmed.split(/\s+/)
    const lower = cmdName.toLowerCase()

    if (lower === 'clear') {
      setHistory([])
      return
    }

    const cmd = commands[lower]
    if (!cmd) {
      setHistory((prev) => [
        ...prev,
        newHistoryLine,
        { type: 'output', text: `Command '${cmdName}' not found. Try 'help'.` },
      ])
      return
    }

    const result = cmd.fn(args)
    setHistory((prev) => [
      ...prev,
      newHistoryLine,
      ...(result ? [{ type: 'output', text: result }] : []),
    ])
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      runCommand(input)
      if (input.trim() !== '') {
        setCmdHistory((prev) => [...prev, input])
      }
      setHistoryIndex(-1)
      setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (cmdHistory.length === 0) return
      const nextIndex =
        historyIndex === -1 ? cmdHistory.length - 1 : Math.max(0, historyIndex - 1)
      setHistoryIndex(nextIndex)
      setInput(cmdHistory[nextIndex])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex === -1) return
      const nextIndex = historyIndex + 1
      if (nextIndex >= cmdHistory.length) {
        setHistoryIndex(-1)
        setInput('')
      } else {
        setHistoryIndex(nextIndex)
        setInput(cmdHistory[nextIndex])
      }
    }
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'end' })
  }, [history])

  return (
    <MacWindow title="Terminal" onClose={onClose}>
      <div
        className="Cli-Window"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((line, i) => (
          <div key={i} className={`cli-line ${line.type}`}>
            {line.text.split('\n').map((l, j) => (
              <div key={j}>{l}</div>
            ))}
          </div>
        ))}

        <div className="cli-line input-line">
          <span className="prompt">{promptLabel}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            spellCheck={false}
            autoComplete="off"
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </MacWindow>
  )
}

export default Cli
