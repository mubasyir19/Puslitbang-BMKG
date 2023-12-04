'use client'

import '@mantine/tiptap/styles.css'
import '@mantine/core/styles.css'

import { FileInput, MantineProvider, TagsInput, TextInput } from '@mantine/core'
import { RichTextEditor, Link } from '@mantine/tiptap'
import { useEditor } from '@tiptap/react'
import Highlight from '@tiptap/extension-highlight'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Superscript from '@tiptap/extension-superscript'
import SubScript from '@tiptap/extension-subscript'
import { Button } from '@mantine/core'
import { useState } from 'react'
import { useForm } from '@mantine/form'

export default function AddArticlePage() {
  const [content, setContent] = useState('')

  const form = useForm({
    initialValues: {
      title: '',
      images: [],
      slug: '',
      tags: [],
      text: '',
    },
    validate: {},
  })

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: form.values.text,
    onUpdate: ({ editor }) => {
      form.setFieldValue('text', editor.getHTML())
    },
  })

  const handleFileChange = (file) => {
    form.setFieldValue('images', file)
  }

  const handleSubmit = (values) => {
    form.validate()
    if (form.isValid()) {
      console.log(form.values)
      setContent(form.values)
    } else {
      console.log({ message: 'invalid' })
      setContent(undefined)
    }
  }

  const handleClear = () => {
    setContent('')
  }

  return (
    <section className="px-5 pt-6">
      <div>
        <h1 className="text-2xl font-semibold">Add User</h1>
      </div>

      <MantineProvider>
        <form
          encType="multipart/form-data"
          onSubmit={form.onSubmit(handleSubmit)}
        >
          <TextInput
            className="mt-2"
            label="Title"
            type="text"
            placeholder="Enter title"
            {...form.getInputProps('title')}
          />
          <FileInput
            label="Upload File"
            placeholder="Pilih file"
            multiple
            onChange={handleFileChange}
            {...form.getInputProps('images')}
          />
          <TextInput
            className="mt-2"
            label="Slug"
            type="text"
            placeholder="Enter slug"
            {...form.getInputProps('slug')}
          />
          <TagsInput
            className="mt-2"
            label="Tags"
            placeholder="Enter tag"
            data={[]}
            {...form.getInputProps('tags')}
          />
          <div className="mt-2">
            <p className="text-sm font-semibold">Content Article</p>
            <RichTextEditor editor={editor}>
              <RichTextEditor.Toolbar>
                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Bold />
                  <RichTextEditor.Italic />
                  <RichTextEditor.Underline />
                  <RichTextEditor.Strikethrough />
                  <RichTextEditor.ClearFormatting />
                  <RichTextEditor.Highlight />
                  <RichTextEditor.Code />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.H1 />
                  <RichTextEditor.H2 />
                  <RichTextEditor.H3 />
                  <RichTextEditor.H4 />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Blockquote />
                  <RichTextEditor.Hr />
                  <RichTextEditor.BulletList />
                  <RichTextEditor.OrderedList />
                  <RichTextEditor.Subscript />
                  <RichTextEditor.Superscript />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Link />
                  <RichTextEditor.Unlink />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.AlignLeft />
                  <RichTextEditor.AlignCenter />
                  <RichTextEditor.AlignJustify />
                  <RichTextEditor.AlignRight />
                </RichTextEditor.ControlsGroup>
              </RichTextEditor.Toolbar>

              <RichTextEditor.Content />
            </RichTextEditor>
          </div>

          <div className="mt-2 flex gap-x-2">
            <Button onClick={handleSubmit}>Submit</Button>
            <Button onClick={handleClear}>Clear</Button>
          </div>
        </form>
        <div>
          <p>Judul : {content.title}</p>
          {/* <p>Image : {content.images[0].name}</p> */}
          <p>Slug : {content.slug}</p>
          <p>Tags : {content.tags}</p>
          <p>Content : {content.text}</p>
        </div>
      </MantineProvider>
    </section>
  )
}
