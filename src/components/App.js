import React, { useState, useEffect } from 'react';
import Editor from './Editor'
import useLocalStorage from '../hooks/useLocalStorage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCss3,faCode } from '@fortawesome/free-solid-svg-icons'

function App() {
  const [html, setHtml] = useLocalStorage('html', '')
  const [css, setCss] = useLocalStorage('css', '')
  const [js, setJs] = useLocalStorage('js', '')
  const [srcDoc, setSrcDoc] = useState('')
  const [theme,setTheme]= useState({
    xml:'material',
    css:'material',
    javascript:'material'
  })

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `)
    }, 250)

    return () => clearTimeout(timeout)
  }, [html, css, js])

  const onChangeTheme=(event) =>{
    const value=event.target.value;
    if(event.target.name==='xml'){
      setTheme((prevTheme)=>({
        ...prevTheme,
        xml:value,
      }))
    }
    if(event.target.name==='css'){
      setTheme((prevTheme)=>({
        ...prevTheme,
        css:value,
      }))
    }
    if(event.target.name==='javascript'){
      setTheme((prevTheme)=>({
        ...prevTheme,
        javascript:value,
      }))
    }
  }

  return (
    <div className='main-div'>
      <div className="top-pane">
        <Editor
          language="xml"
          theme={theme.xml}
          onChangeTheme={onChangeTheme}
          // icon={<FontAwesomeIcon icon={faCode}/>}
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
        <Editor
          language="css"
          theme={theme.css}
          onChangeTheme={onChangeTheme}
          displayName="CSS"
          value={css}
          onChange={setCss}
        />
        <Editor
          language="javascript"
          theme={theme.javascript}
          onChangeTheme={onChangeTheme}
          displayName="JS"
          value={js}
          onChange={setJs}
        />
      </div>
      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </div>
  )
}

export default App;
