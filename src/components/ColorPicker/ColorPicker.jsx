import React, { useState } from 'react'
import './ColorPicker.css'

const ColorPicker = ({ color, setColor }) => {
  const handleChange = (event) => {
    setColor(event.target.value)
  }

  return (
    <div className='color-picker-container'>
      <input
        type='color'
        value={color}
        onChange={handleChange}
        className='color-input'
      />
    </div>
  )
}

export default ColorPicker
