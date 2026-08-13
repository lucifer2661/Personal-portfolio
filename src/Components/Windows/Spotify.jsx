import React from 'react'
import MacWindow from './MacWindow'
import './Spotify.scss'

const Spotify = ({ onClose }) => {
  return (
    /* 152px (Spotify) + ~35px (MacWindow Header) = ~187px */
    <MacWindow width={420} height={390}onClose={onClose} title="Spotify">
  <div className="spotifyWindow">
    <iframe
      src="https://open.spotify.com/embed/playlist/0NtaDFX6V69lqw84zYz8jq?utm_source=generator"
      title="Spotify Playlist"
      width="100%"
      height="352"
      frameBorder="0"
      allowFullScreen
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    />
  </div>
</MacWindow>
  )
}

export default Spotify