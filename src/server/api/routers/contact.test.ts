
import { describe, expect, it, beforeEach, afterAll } from "vitest";
import { TRPCError } from "@trpc/server";
import { PrismaClient } from "@prisma/client";
import { appRouter } from "~/server/api/root";
import { createContextInner } from "~/server/api/trpc";

import type { AppRouter } from "~/server/api/root";
import type { inferRouterInputs } from "@trpc/server";
import type { ContactInput } from "~/modules/contact/logic/contactSchema";


const TEST_DATABASE_URL = process.env.DATABASE_URL as string;

let prisma: PrismaClient;

const createCaller = async () => {
  const ctx = await createContextInner({ db: prisma });
  return appRouter.createCaller(ctx);
};

type RouterInputs = inferRouterInputs<AppRouter>;
type ContactSubmitInput = RouterInputs['contact']['submit'];

const validTestData: ContactInput = {
  firstName: "John",
  lastName: "Doe",
  phone: "1234567890",
  email: "john.doe@example.com",
};

describe("contactRouter integration", () => {
  beforeAll(async () => {
    if (!TEST_DATABASE_URL || !TEST_DATABASE_URL.startsWith('postgresql://')) {
        throw new Error('DATABASE_URL for testing is not set or is not a PostgreSQL URL. Please configure it in your .env.test file.');
    }

    prisma = new PrismaClient({
      datasources: {
        db: {
          url: TEST_DATABASE_URL,
        },
      },
    });
    await prisma.$connect();
    await prisma.contact.deleteMany({});
  });

  beforeEach(async () => {
    await prisma.contact.deleteMany({});
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should submit contact successfully", async () => {
    const caller = await createCaller();
    const result = await caller.contact.submit(validTestData);
    
    expect(result).toEqual(expect.objectContaining({
      ...validTestData,
      id: expect.any(String),
    }));
  });


  it("should reject an invalid contact submission", async () => {
    const caller = await createCaller();
    const invalidInput: Partial<ContactSubmitInput> = {
      firstName: "Test",
      email: "test@example.com",
    };
    await expect(caller.contact.submit(invalidInput as ContactSubmitInput)).rejects.toThrow(TRPCError);
    await expect(caller.contact.submit(invalidInput as ContactSubmitInput)).rejects.toHaveProperty('code', 'BAD_REQUEST');
  });
  

  it("should throw a CONFLICT error for a duplicate contact", async () => {
    const caller = await createCaller();
    await caller.contact.submit(validTestData);
    const duplicateData: ContactInput = {
      firstName: "Jane",
      lastName: "Doe",
      phone: validTestData.phone,
      email: validTestData.email,
    };
    await expect(caller.contact.submit(duplicateData)).rejects.toThrow(TRPCError);
    await expect(caller.contact.submit(duplicateData)).rejects.toHaveProperty('code', 'CONFLICT');
    await expect(caller.contact.submit(duplicateData)).rejects.toHaveProperty('message', 'This contact already exists.');
  });
});




