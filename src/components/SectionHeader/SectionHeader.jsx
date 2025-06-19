import React from 'react'
import "./sectionheader.scss"

function SectionHeader({title}) {
  return (
    <h1 className='section-header'>{title}</h1>
  )
}

export default SectionHeader