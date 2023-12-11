'use client'

import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useState, useEffect } from 'react'

export default function ArticleTextDisplay({ content }) {
  const [textContent, setTextContent] = useState('')
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    editable: false,
  })

  useEffect(() => {
    if (editor !== null) {
      setTextContent(editor.getText())
    }
  }, [editor])

  return <>{textContent}</>
}
