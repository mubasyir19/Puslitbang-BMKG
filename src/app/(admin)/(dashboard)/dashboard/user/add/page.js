'use client'

import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'

import { TextInput } from '@mantine/core'
import { Button } from '@mantine/core'
import { useForm, isNotEmpty, matchesField, isEmail } from '@mantine/form'
import { fetcher } from '@/helpers/fetcher'
import { notifications } from '@mantine/notifications'
import { useRouter } from 'next/navigation'

export default function AddUserPage() {
  const router = useRouter()

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      cPassword: '',
    },
    validate: {
      name: isNotEmpty('Name is required'),
      email: isEmail('Invalid email'),
      password: isNotEmpty('Password is required'),
      cPassword: matchesField('password', 'Confirm password is not matches'),
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
        await fetcher.post('/users/register', form.values)
        notifications.show({
          title: 'Success add user',
        })
        router.push('/dashboard/user')
      } catch (err) {
        if (err.response.status === 400) {
          notifications.show({
            color: 'red',
            title: err.response.data.message,
          })
        } else {
          notifications.show({
            color: 'red',
            title: 'Failed add user',
          })
        }
      }
    }
  }

  return (
    <section className="px-5 pt-6">
      <div className="border-b mb-4">
        <h1 className="text-2xl font-semibold">Add User</h1>
      </div>

      <form
        encType="multipart/form-data"
        onSubmit={form.onSubmit(handleSubmit)}
        autoComplete="off"
        className="flex flex-col gap-2"
      >
        <TextInput
          label="Name"
          type="text"
          placeholder="Enter name"
          {...form.getInputProps('name')}
        />
        <TextInput
          label="Email"
          type="text"
          placeholder="Enter email"
          {...form.getInputProps('email')}
        />
        <TextInput
          label="Password"
          type="password"
          placeholder="Enter password"
          {...form.getInputProps('password')}
        />
        <TextInput
          label="Confirm Password"
          type="password"
          placeholder="Reenter your password"
          {...form.getInputProps('cPassword')}
        />

        <div className="mt-2 flex gap-x-2">
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </form>
    </section>
  )
}
