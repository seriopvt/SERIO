-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "generated_by" TEXT;

-- AlterTable
ALTER TABLE "recipes_am" ADD COLUMN     "generated_by" TEXT;

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_generated_by_fkey" FOREIGN KEY ("generated_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipes_am" ADD CONSTRAINT "recipes_am_generated_by_fkey" FOREIGN KEY ("generated_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
