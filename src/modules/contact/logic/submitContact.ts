import { db } from "~/server/db"
import type { ContactInput } from "./contactSchema"

export async function submitContact(data: ContactInput) {
  return db.contact.create({
    data,
  })
}
