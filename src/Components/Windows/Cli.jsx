import React, { useRef } from 'react'
import * as ReactConsoleEmulator from 'react-console-emulator'
import MacWindow from './MacWindow'
import './Cli.scss'

function resolveComponent(mod) {
  let candidate = mod
  let depth = 0
  while (candidate && typeof candidate !== 'function' && candidate.default && depth < 5) {
    candidate = candidate.default
    depth++
  }
  return candidate
}

const Terminal = resolveComponent(ReactConsoleEmulator)

const Cli = ({ onClose }) => {
  const terminalRef = useRef(null)
  const lastLogin = new Date().toString().replace(/GMT.*/, '').trim()

  const commands = {
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
      usage: 'projects [--verbose]',
      fn: (flag) =>
        flag === '--verbose'
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
      usage: 'sudo <command>',
      fn: (arg) =>
        arg === 'hire-me'
          ? "Permission granted. Check 'contact' for my details — let's talk!"
          : `sudo: ${arg || ''}: command not found. Nice try though.`,
    },
  }

  return (
    <MacWindow title="Terminal" onClose={onClose}>
      <div className="Cli-Window">
        <Terminal
          ref={terminalRef}
          commands={commands}
          welcomeMessage={`Last login: ${lastLogin} on ttys000`}
          promptLabel={'aditya@MacBook-Pro ~ %'}
          autoFocus
          style={{
            height: '100%',
            backgroundColor: '#0d1117',
            borderRadius: 0,
            boxShadow: 'none',
            padding: '12px 16px',
          }}
          contentStyle={{
            color: '#00ff41',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '13.5px',
            lineHeight: '1.6',
            letterSpacing: '0.2px',
          }}
          promptLabelStyle={{ color: '#00ff41', fontWeight: 700 }}
          inputStyle={{
            color: '#00ff41',
            fontFamily: "'JetBrains Mono', monospace",
          }}
          messageStyle={{
            color: '#00ff41',
            fontFamily: "'JetBrains Mono', monospace",
          }}
        />
      </div>
    </MacWindow>
  )
}

export default Cli