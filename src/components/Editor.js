import React, { useState } from 'react'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/theme/dracula.css'
import 'codemirror/theme/blackboard.css'
import 'codemirror/theme/icecoder.css'
import 'codemirror/theme/eclipse.css'
import 'codemirror/theme/midnight.css'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import { Controlled as ControlledEditor } from 'react-codemirror2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompressAlt, faExpandAlt } from '@fortawesome/free-solid-svg-icons'

export default function Editor(props) {
  const {
    language,
    theme,
    displayName,
    value,
    onChange,
    onChangeTheme
  } = props
  const [open, setOpen] = useState(true)

  function handleChange(editor, data, value) {
    onChange(value)
  }

  return (
    <div className={`editor-container ${open ? '' : 'collapsed'}`}>
      <div className="editor-title">
        <div>
        {displayName}
        </div>
        <div>
        Theme: 
        <select name={language} id="theme" value={theme} onChange={onChangeTheme} className='theme-selector'>
          <option value="material">Material</option>
          <option value="dracula">Dracula</option>
          <option value="blackboard">Blackboard</option>
          <option value="icecoder">Icecoder</option>
          <option value="eclipse">Eclipse</option>
          <option value="midnight">Midnight</option>
        </select>
        <button
          type="button"
          className="expand-collapse-btn"
          onClick={() => setOpen(prevOpen => !prevOpen)}
        >
          <FontAwesomeIcon icon={open ? faCompressAlt : faExpandAlt} />
        </button>
        </div>
        
      </div>
      <ControlledEditor
        onBeforeChange={handleChange}
        value={value}
        className="code-mirror-wrapper"
        options={{
          lineWrapping: true,
          lint: true,
          mode: language,
          theme: theme,
          lineNumbers: true
        }}
      />
    </div>
  )
}
