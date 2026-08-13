import React, { forwardRef } from 'react'
import './MacWindow.scss'
import { Rnd } from 'react-rnd'

const MacWindow = forwardRef(
  (
    {
      children,
      title = 'Mac Window',
      width = 560,
      height = 420,
      onClose,
    },
    ref
  ) => {
    return (
      <Rnd
        default={{
          x: 100,
          y: 80,
          width,
          height,
        }}
        minWidth={400}
        minHeight={280}
        maxWidth="85vw"
        maxHeight="80vh"
        dragHandleClassName="nav"
        className="rnd-container"
      >
        <div className="window">

          <div className="nav">
           <div className="dots">
  <span className="dot close" onClick={onClose}>
    <svg viewBox="0 0 10 10" className="glyph">
      <path d="M1.5 1.5L8.5 8.5M8.5 1.5L1.5 8.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  </span>
  <span className="dot minimize">
    <svg viewBox="0 0 10 10" className="glyph">
      <path d="M1.5 5H8.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  </span>
  <span className="dot maximize">
    <svg viewBox="0 0 10 10" className="glyph">
      <path d="M2 6L6 2M2.5 2H6V5.5M8 4L4 8M7.5 8H4V4.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  </span>
</div>

            <div className="title">
              {title}
            </div>
          </div>

          <div className="main-content" ref={ref}>
            {children}
          </div>

        </div>
      </Rnd>
    )
  }
)

export default MacWindow