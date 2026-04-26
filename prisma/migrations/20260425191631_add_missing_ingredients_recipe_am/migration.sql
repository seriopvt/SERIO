-- AlterTable
ALTER TABLE "recipes_am" ADD COLUMN     "ingredients" TEXT[] DEFAULT ARRAY[]::TEXT[];
