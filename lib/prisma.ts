import { PrismaClient } from "../prisma/app/generated/prisma/";
import { PrismaPg } from "@prisma/adapter-pg";

// This prevents TypeScript from complaining about the global variable
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const createPrismaClient = () => {
  // Prisma 7 (at least this v7.4.2) requires a driver adapter.
  // We're using @prisma/adapter-pg which is now a standard requirement in this setup.
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  });
  return new PrismaClient({ adapter });
};

// Use the existing client if it exists, otherwise create a new one
export const db = globalForPrisma.prisma ?? createPrismaClient();

// In development, save the client to the global object so it survives hot-reloads
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}