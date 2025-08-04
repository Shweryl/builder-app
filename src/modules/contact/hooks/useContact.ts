"use client"

import { api } from "~/utils/api"
import { TRPCClientError } from "@trpc/client"
import type { ContactInput } from "~/modules/contact/logic/contactSchema"

export function useContact({
  onSuccess,
  onError,
  onDuplicate,
}: {
  onSuccess?: (data: unknown) => void
  onError?: (message: string) => void
  onDuplicate?: () => void
} = {}) {
  const mutation = api.contact.submit.useMutation()

  const submit = async (formData: ContactInput) => {
    try {
      const result = await mutation.mutateAsync(formData)
      onSuccess?.(result)
    } catch (err) {
      console.log(err);
      if (
        err instanceof TRPCClientError &&
        typeof err.data === "object" &&
        err.data !== null &&
        "code" in err.data &&
        (err.data as { code?: string }).code === "CONFLICT"
      ) {
        onDuplicate?.()
        return
      }

      onError?.("Failed to submit contact")
    }
  }

  return {
    submit,
    isLoading: mutation.isPending,
  }
}
