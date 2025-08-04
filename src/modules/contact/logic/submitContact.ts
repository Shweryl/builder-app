import { db } from "~/server/db"
import type { ContactInput } from "./contactSchema"
import { notion } from "~/utils/notion"
import { getNotionDatabaseId } from "~/utils/dbId";

export async function submitContact(data: ContactInput) {
  // return db.contact.create({
  //   data,
  // })
  const db = getNotionDatabaseId();
  
  const existing = await notion.databases.query({

    // Check if the same email with the same phone number exists.
    database_id: db,
    filter: {
      and: [
        {
          property: "email",
          email: {
            equals: data.email,
          },
        },
        {
          property: "phone",
          rich_text: {
            equals: data.phone,
          },
        },
      ],
    },
  });

  //if exist, return conflict status code
  if (existing.results.length > 0) {
    const error = new Error("A contact with this email and phone already exists.") as Error & { statusCode?: number }
    error.statusCode = 409
    throw error
  }

  if (existing.results.length == 0) {
    const response = await notion.pages.create({
      parent: {
        database_id: db,
      },
      properties: {
        firstName: {
          title: [
            {
              text: {
                content: data.firstName,
              },
            },
          ],
        },
        lastName: {
          rich_text: [
            {
              text: {
                content: data.lastName,
              },
            },
          ],
        },
        email: {
          email: data.email,
        },
        phone: {
          rich_text: [
            {
              text: {
                content: data.phone
              }
            }
          ]
        },
      }
    });

    return response;

    console.log(response);
  }
}



