import React, { useState } from 'react'
import './Modal.css'

const Modal = ({ show, handleClose, children, animate }) => {
  return (
    <div
      className={`modal ${show ? 'show' : ''} ${animate ? 'modal-close' : ''} `}
    >
      <div className='modal-content'>
        <span className='close' onClick={handleClose}>
          &times;
        </span>
        {children}
      </div>
    </div>
  )
}

export default Modal
