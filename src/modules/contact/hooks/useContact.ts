"use client"

import { api } from "~/utils/api"

export function useContact({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: any) => void
  onError?: (message: string) => void
} = {}) {
  const mutation = api.contact.submit.useMutation()

  const submit = async (formData: {
    firstName: string
    lastName: string
    phone: string
    email: string
  }) => {
    try {
      const result = await mutation.mutateAsync(formData)
      onSuccess?.(result)
    } catch (err) {
      onError?.("Failed to submit contact")
    }
  }

  return {
    submit,
    isLoading: mutation.isPending,
  }
}
