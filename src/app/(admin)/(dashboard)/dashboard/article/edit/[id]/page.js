'use client'

import '@mantine/tiptap/styles.css'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'

import { FileInput, TagsInput, TextInput } from '@mantine/core'
import { RichTextEditor, Link } from '@mantine/tiptap'
import { useEditor } from '@tiptap/react'
import Highlight from '@tiptap/extension-highlight'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Superscript from '@tiptap/extension-superscript'
import SubScript from '@tiptap/extension-subscript'
import { Button } from '@mantine/core'
import { useForm, isNotEmpty, matches } from '@mantine/form'
import { fetcherSWR, fetcher } from '@/helpers/fetcher'
import { notifications } from '@mantine/notifications'
import { useEffect } from 'react'
import { convertToSlug } from '@/helpers/utils'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'

export default function Page({ params }) {
  const router = useRouter()
  const { data, error, isLoading } = useSWR(`/posts/${params.id}`, fetcherSWR)

  const form = useForm({
    initialValues: {
      title: '',
      image: null,
      slug: '',
      tags: [],
      text: '',
    },
    validate: {
      title: isNotEmpty('Title is required'),
      slug: matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid slug format'),
      text: isNotEmpty('Content is required'),
    },
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
      if (editor.getText() === '') {
        form.setFieldValue('text', '')
      } else {
        form.setFieldValue('text', editor.getHTML())
      }
    },
  })

  useEffect(() => {
    form.setFieldValue('title', data?.title || '')
    form.setFieldValue('slug', data?.slug || '')
    form.setFieldValue(
      'tags',
      data?.tags !== null ? data?.tags.split(',').map((tag) => tag) : [],
    )
    form.setFieldValue('text', data?.text || '')
    editor?.commands.setContent(data?.text || '')
  }, [data])

  useEffect(() => {
    const slug = convertToSlug(form.values.title)
    form.setFieldValue('slug', slug)
  }, [form.values.title])

  const handleSubmit = async () => {
    form.validate()
    if (form.isValid()) {
      const formData = new FormData()
      for (const [key, value] of Object.entries(form.values)) {
        formData.append(key, value)
      }
      try {
        await fetcher.put(`/posts/${params.id}`, formData)
        notifications.show({
          title: 'Success edit article',
        })
        router.push('/dashboard/article')
      } catch (err) {
        if (err.response.data.message === 'slug is already taken') {
          notifications.show({
            color: 'red',
            title: 'Title with same slug is already taken',
            message: 'Try using custom slug',
          })
        }
      }
    }
  }

  return (
    <section className="px-5 pt-6">
      <div className="border-b mb-4">
        <h1 className="text-2xl font-semibold">Edit Article</h1>
      </div>

      {error ? (
        'Error'
      ) : isLoading ? (
        'Loading...'
      ) : (
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
          <TextInput
            label="Slug"
            type="text"
            placeholder="Enter slug"
            {...form.getInputProps('slug')}
          />
          <FileInput
            accept="image/png,image/jpeg"
            label="Cover image"
            placeholder="Choose image"
            {...form.getInputProps('image')}
          />
          <div className="h-[200px] w-[200px] border">
            <p></p>
            <img src={data?.image} className="w-full h-full object-contain" />
          </div>
          <TagsInput
            label="Tag"
            placeholder="Enter tag (tap enter to select tag) (optional)"
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
            <p className="text-[#fa5252] text-[12px] mt-[5px]">
              {form.errors.text}
            </p>
          </div>

          <div className="mt-2 flex gap-x-2">
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        </form>
      )}
    </section>
  )
}
