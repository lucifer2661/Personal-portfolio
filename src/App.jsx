import React, { useState } from 'react'
import "./app.scss"
import Dock from './Components/Dock'
import Nav from './Components/Nav'
import MacWindow from './Components/Windows/MacWindow'
import Github from './Components/Windows/Github'
import Note from './Components/Windows/Note'
import Pdf from './Components/Windows/Pdf'
import Spotify from './Components/Windows/Spotify'
import Cli from './Components/Windows/Cli'

const App = () => {
  const [windowState, setWindowState] = useState({
    Github: false,
    Note: false,
    Pdf: false,
    Spotify: false,
    Cli: false,
  })

return (
  <main>
    <Nav />
    {/* Pass setWindowState down to Dock so clicking icons can toggle windows */}
    <Dock windowState={windowState} setWindowState={setWindowState} />

    {/* Only show windows when their state is true */}
    {windowState.Github && (
      <Github onClose={() => setWindowState((prev) => ({ ...prev, Github: false }))} />
    )}
    {windowState.Note && (
      <Note onClose={() => setWindowState((prev) => ({ ...prev, Note: false }))} />
    )}
    {windowState.Pdf && (
      <Pdf onClose={() => setWindowState((prev) => ({ ...prev, Pdf: false }))} />
    )}
    {windowState.Spotify && (
      <Spotify onClose={() => setWindowState((prev) => ({ ...prev, Spotify: false }))} />
    )}
    {windowState.Cli && (
      <Cli onClose={() => setWindowState((prev) => ({ ...prev, Cli: false }))} />
    )}
  </main>
)
}

export default App