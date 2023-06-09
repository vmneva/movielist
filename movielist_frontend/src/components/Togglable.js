import { useState, useImperativeHandle, forwardRef } from 'react'
import { ReactComponent as CloseIcon } from '../icons/close.svg';
import '../index.css'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button className="listbutton" onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button className="closebutton" onClick={toggleVisibility}>
          <CloseIcon />
        </button>
      </div>
    </div>
  )
})

export default Togglable
