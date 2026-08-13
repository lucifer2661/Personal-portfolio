import React, { useRef } from 'react'
import MacWindow from './MacWindow'
import githubData from '../../../public/Data/GithubData.json'
import './Github.scss'

const { profile, stats, top_projects, open_source } = githubData

const Line = ({ delay, onShow, children }) => {
  const [show, setShow] = React.useState(false)
  React.useEffect(() => {
    const t = setTimeout(() => {
      setShow(true)
      onShow?.()
    }, delay)
    return () => clearTimeout(t)
  }, [delay, onShow])
  return <div className={`line ${show ? 'in' : ''}`}>{children}</div>
}

const rawLines = [
  { gap: 0, node: (
      <>
        <span className="prompt">visitor@portfolio</span>
        <span className="sep">:~$</span> whoami
      </>
    ) },
  { gap: 500, node: (
      <span className="out">
        <span className="name">{profile.name}</span> — {profile.headline}
      </span>
    ) },

  { gap: 700, node: (
      <>
        <span className="prompt">visitor@portfolio</span>
        <span className="sep">:~$</span> cat stats.json
      </>
    ) },
  { gap: 500, node: (
      <span className="out stats">
        repos <b>{stats.public_repositories}</b> &nbsp;·&nbsp;
        followers <b>{stats.followers}</b> &nbsp;·&nbsp;
        since <b>{stats.account_created_at}</b>
      </span>
    ) },

  { gap: 700, node: (
      <>
        <span className="prompt">visitor@portfolio</span>
        <span className="sep">:~$</span> ls top_projects/
      </>
    ) },
  ...top_projects.map((p) => ({
    gap: 450,
    node: (
      <span className="proj">
        <a href={p.live_url || p.github_url} target="_blank" rel="noreferrer">
          {p.name}
        </a>
        <span className="stack">[{p.tech_stack.join(', ')}]</span>
        <span className="desc">{p.description}</span>
      </span>
    ),
  })),

  { gap: 700, node: (
      <>
        <span className="prompt">visitor@portfolio</span>
        <span className="sep">:~$</span> git log --oneline open-source/
      </>
    ) },
  { gap: 500, node: (
      <span className="out">
        * merged &nbsp;
        <a href={open_source.repo_url} target="_blank" rel="noreferrer">
          {open_source.project}
        </a>
      </span>
    ) },
  { gap: 400, node: (
      <span className="out dim">
        * open &nbsp;&nbsp;{open_source.status.split(';')[1]?.trim() || 'in review'}
      </span>
    ) },

  { gap: 700, node: (
      <>
        <span className="prompt">visitor@portfolio</span>
        <span className="sep">:~$</span>
        <span className="cursor">▌</span>
      </>
    ) },
]

const lines = rawLines.reduce((acc, line, i) => {
  const delay = i === 0 ? 0 : acc[i - 1].delay + line.gap
  acc.push({ ...line, delay })
  return acc
}, [])

const Github = ({ onClose }) => {
  const mainRef = useRef(null)

  return (
    <MacWindow ref={mainRef} title="Git-Hub" onClose={onClose}>
      <div className="term">
        {lines.map((line, i) => (
          <Line
            key={i}
            delay={line.delay}
            onShow={() => {
              mainRef.current?.scrollTo({
                top: mainRef.current.scrollHeight,
                behavior: 'smooth',
              })
            }}
          >
            {line.node}
          </Line>
        ))}
      </div>
    </MacWindow>
  )
}

export default Github