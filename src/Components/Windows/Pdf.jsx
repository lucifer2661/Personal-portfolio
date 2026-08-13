import React from 'react'
import MacWindow from './MacWindow'
import './Pdf.scss'

const Pdf = ({onClose}) => {
  return (
    <MacWindow onClose={onClose} title="Pdf">
        <div className="resume-window" onClose={onClose}>
            <iframe
          src="/resume_2%20(2).pdf"
          title="Resume"
        />
        </div>
    </MacWindow>
  )
}

export default Pdf