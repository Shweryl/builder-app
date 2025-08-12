

export function getNotionDatabaseId(): string {
  return process.env.NODE_ENV === "test"
    ? process.env.NOTION_TEST_DATABASE_ID!
    : process.env.NOTION_DATABASE_ID!;
}

