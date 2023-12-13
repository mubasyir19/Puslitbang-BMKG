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
import { useForm } from '@mantine/form'
import { fetcher } from '@/helpers/fetcher'

export default function AddArticlePage() {
  const form = useForm({
    initialValues: {
      title: '',
      image: null,
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
    onUpdate: ({ editor }) => {
      form.setFieldValue('text', editor.getHTML())
    },
  })

  const handleSubmit = async () => {
    form.validate()
    if (form.isValid()) {
      const formData = new FormData()
      for (const [key, value] of Object.entries(form.values)) {
        formData.append(key, value)
      }
      try {
        const res = await fetcher.post('/posts', formData)
        console.log(res)
      } catch (err) {}
    }
  }

  return (
    <section className="px-5 pt-6">
      <div className='border-b mb-4'> 
        <h1 className="text-2xl font-semibold">Add User</h1>
      </div>

      <MantineProvider>
        <form
          encType="multipart/form-data"
          onSubmit={form.onSubmit(handleSubmit)}
          className="flex flex-col gap-2"
        >
          <TextInput
            label="Title"
            type="text"
            placeholder="Enter title"
            {...form.getInputProps('title')}
          />
          <FileInput
            accept="image/png,image/jpeg"
            label="Upload File"
            placeholder="Pilih file"
            {...form.getInputProps('image')}
          />
          <TextInput
            label="Slug"
            type="text"
            placeholder="Enter slug"
            {...form.getInputProps('slug')}
          />
          <TagsInput
            label="Tags"
            placeholder="Enter tag"
            data={[]}
            {...form.getInputProps('tags')}
          />
          <div>
            <p className="font-[500] text-[14px]">Content</p>
            <RichTextEditor editor={editor} className="bg-white">
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
          </div>
        </form>
      </MantineProvider>
    </section>
  )
}
