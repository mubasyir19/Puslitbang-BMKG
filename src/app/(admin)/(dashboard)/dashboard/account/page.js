'use client'

import useSWR from 'swr'
import { fetcherSWR, fetcher } from '@/helpers/fetcher'
import { TextInput, PasswordInput } from '@mantine/core'
import { useForm, isNotEmpty, matchesField } from '@mantine/form'
import { useEffect, useState } from 'react'
import { notifications } from '@mantine/notifications'

export default function AccountPage() {
  const { data } = useSWR('/users/info', fetcherSWR)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rPassword: '',
    },
    validate: {
      name: isNotEmpty('Name is required'),
      rPassword: matchesField('password', 'Repeat password are not the same'),
    },
  })

  useEffect(() => {
    if (data) {
      form.setValues({ name: data.data.name, email: data.data.email })
    }
  }, [data])

  const handleSubmit = async () => {
    form.validate()
    if (form.isValid()) {
      const body = {
        name: form.values.name,
        password: form.values.password || undefined,
      }

      setIsLoading(true)
      try {
        await fetcher.patch('/users', body)
        notifications.show({
          title: 'Success update account',
        })
      } catch (err) {
        notifications.show({
          color: 'red',
          title: 'Failed update account',
        })
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <section className="px-5 pt-6">
      <div className="border-b mb-4">
        <h1 className="text-2xl font-semibold">Account</h1>
      </div>

      <form
        autoComplete="off"
        onSubmit={form.onSubmit(handleSubmit)}
        className="flex flex-col gap-2 max-w-md"
      >
        <TextInput
          label="Name"
          placeholder="Enter name"
          {...form.getInputProps('name')}
        />
        <TextInput
          label="Email"
          placeholder="Enter email"
          disabled
          {...form.getInputProps('email')}
        />
        <h2 className="mt-4 font-bold">Update Password</h2>
        <PasswordInput
          label="New Password"
          placeholder="Enter new password"
          {...form.getInputProps('password')}
        />
        <PasswordInput
          label="Repeat New Password"
          placeholder="Repeat new password"
          {...form.getInputProps('rPassword')}
        />

        <div className="mt-2 flex gap-x-2">
          <button
            type="submit"
            className="bg-sky-500 text-white px-4 py-2 rounded"
          >
            Update
          </button>
        </div>
      </form>
    </section>
  )
}
