import React, { useCallback, useEffect } from 'react'
import './Editor.css'
import useCodeMirror from './use-codemirror'

interface Props {
  initialDoc: string
  onChange: (doc: string) => void
}

const Editor: React.FC<Props> = ({ initialDoc, onChange }) => {
  const handleChange = useCallback(
    state => onChange(state.doc.toString()),
    [onChange]
  )

  const [refContainer, editorView] = useCodeMirror<HTMLDivElement>({
    initialDoc,
    onChange: handleChange
  })

  useEffect(() => {
    if (editorView) {
    }
  }, [editorView])

  return <div className="editor-wrapper" ref={refContainer} />
}

export default Editor
