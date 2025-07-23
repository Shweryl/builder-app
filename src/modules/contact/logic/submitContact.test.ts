import { describe, it, expect } from "vitest"
import { submitContact } from "./submitContact"

describe("submitContact()", () => {
  it("saves contact to database", async () => {
    const result = await submitContact({
      firstName: "John",
      lastName: "Doe",
      phone: "123456789",
      email: "john@example.com",
    })

    expect(result).toHaveProperty("id")
    expect(result.email).toBe("john@example.com")
  })
})
