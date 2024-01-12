'use client'

import { TextInput, PasswordInput } from '@mantine/core'
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
      rPassword: '',
    },
    validate: {
      name: isNotEmpty('Name is required'),
      email: isEmail('Invalid email'),
      password: isNotEmpty('Password is required'),
      rPassword: matchesField('password', 'Repeat password are not the same'),
    },
  })

  const handleSubmit = async () => {
    form.validate()
    if (form.isValid()) {
      try {
        await fetcher.post('/users/register', form.values)
        notifications.show({
          title: 'Success add user',
        })
        router.push('/dashboard/user')
      } catch (err) {
        notifications.show({
          color: 'red',
          title: 'Failed add user',
          message: err.response.data.message,
        })
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
        className="flex flex-col gap-2 max-w-md"
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
        <PasswordInput
          label="Password"
          type="text"
          placeholder="Enter password"
          {...form.getInputProps('password')}
        />
        <PasswordInput
          label="Repeat Password"
          type="text"
          placeholder="Enter repeat password"
          {...form.getInputProps('rPassword')}
        />

        <div className="mt-2 flex gap-x-2">
          <button
            type="submit"
            className="bg-sky-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  )
}
