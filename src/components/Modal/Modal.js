import React from 'react'

function Modal(props) {
  const {text} =props
  return (
    <div className='modal'>
    <div className='modalContent'>
<h1>{text}</h1>
    </div>
  </div>
  )
}

export default Modal
