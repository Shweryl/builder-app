"use client"

import React, { useState } from "react"
import { TextField } from "@radix-ui/themes"
import { Button } from "@radix-ui/themes"
import { Label } from "radix-ui";
import { useContact } from "~/modules/contact/hooks/useContact"
import { contactMessages } from "~/modules/demo/data/contact" // update path if needed

export function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [alreadyExists, setAlreadyExists] = useState(false)

  const { submit, isLoading } = useContact({
    onSuccess: () => {
      setSubmitted(true)
      setFormData({ firstName: "", lastName: "", phone: "", email: "" })
    },
    onDuplicate: () => {
      setAlreadyExists(true)
    },
    onError: (message) => {
      setErrors({ general: message })
    },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newErrors: Record<string, string> = {}
    if (!formData.firstName) newErrors.firstName = "First name is required"
    if (!formData.lastName) newErrors.lastName = "Last name is required"
    if (!formData.phone) newErrors.phone = "Phone is required"
    if (!formData.email) newErrors.email = "Email is required"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    void submit(formData)
  }

  const reset = () => {
    setSubmitted(false)
    setAlreadyExists(false)
    setErrors({})
  }

  const showMessage = submitted || alreadyExists

  const title = alreadyExists
    ? contactMessages.duplicateTitle
    : contactMessages.successTitle

  const body = alreadyExists
    ? contactMessages.duplicateBody
    : contactMessages.successBody

  return (
    <section id="contact" className="w-full bg-muted/50 py-20 border-t border-border">
      <div className="container max-w-2xl px-4 mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Let’s Connect</h2>
        <p className="text-muted-foreground mb-10">
          Leave your details and we’ll get in touch with you shortly.
        </p>

        {showMessage ? (
          <div className="text-center space-y-4 py-10">
            <h3 className="text-2xl font-semibold">{title}</h3>
            <p className="text-muted-foreground">{body}</p>
            <Button variant="solid" onClick={reset}>
              {contactMessages.resetLabel}
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label.Root htmlFor="firstName">First name</Label.Root>
                <TextField.Root className="!mt-2" size="3" variant="classic" id="firstName" value={formData.firstName} onChange={handleChange} />
                {errors.firstName && <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>}
              </div>

              <div>
                <Label.Root htmlFor="lastName">Last name</Label.Root>
                <TextField.Root className="!mt-2" size="3" variant="classic" id="lastName" value={formData.lastName} onChange={handleChange} />
                {errors.lastName && <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>}
              </div>
            </div>

            <div>
              <Label.Root htmlFor="phone">Phone</Label.Root>
              <TextField.Root className="!mt-2" size="3" variant="classic" id="phone" value={formData.phone} onChange={handleChange} />
              {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
            </div>

            <div>
              <Label.Root htmlFor="email">Email</Label.Root>
              <TextField.Root className="!mt-2" size="3" variant="classic" id="email" value={formData.email} onChange={handleChange} />
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
            </div>

            <div>
              <Button type="submit" variant="solid" size="3" className="!w-full" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Submit"}
              </Button>
            </div>


            {errors.general && <p className="text-sm text-red-500 mt-2">{errors.general}</p>}
          </form>
        )}
      </div>
    </section>
  )
}
