import React, { lazy, Suspense, useState } from 'react'
import "./app.scss"
import Dock from './Components/Dock'
import Nav from './Components/Nav'

const Github = lazy(() => import('./Components/Windows/Github'))
const Note = lazy(() => import('./Components/Windows/Note'))
const Pdf = lazy(() => import('./Components/Windows/Pdf'))
const Spotify = lazy(() => import('./Components/Windows/Spotify'))
const Cli = lazy(() => import('./Components/Windows/Cli'))

const App = () => {
  const [windowState, setWindowState] = useState({
    Github: false,
    Note: false,
    Pdf: false,
    Spotify: false,
    Cli: false,
  })

  const closeWindow = (window) => {
    setWindowState((prev) => ({
      ...prev,
      [window]: false,
    }))
  }

  return (
    <main>
      <Nav />

      <Dock
        windowState={windowState}
        setWindowState={setWindowState}
      />

      <Suspense fallback={null}>
        {windowState.Github && (
          <Github onClose={() => closeWindow("Github")} />
        )}

        {windowState.Note && (
          <Note onClose={() => closeWindow("Note")} />
        )}

        {windowState.Pdf && (
          <Pdf onClose={() => closeWindow("Pdf")} />
        )}

        {windowState.Spotify && (
          <Spotify onClose={() => closeWindow("Spotify")} />
        )}

        {windowState.Cli && (
          <Cli onClose={() => closeWindow("Cli")} />
        )}
      </Suspense>
    </main>
  )
}

export default App