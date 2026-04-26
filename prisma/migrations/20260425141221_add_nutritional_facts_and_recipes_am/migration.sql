-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "nutritional_facts" JSONB;

-- CreateTable
CREATE TABLE "recipes_am" (
    "id" SERIAL NOT NULL,
    "recipe_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "difficulty" VARCHAR(50),
    "prep_time" VARCHAR(50),
    "cook_time" VARCHAR(50),
    "servings" VARCHAR(50),
    "recipe_data" JSONB NOT NULL,
    "nutritional_facts" JSONB,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "recipes_am_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "recipes_am_recipe_id_key" ON "recipes_am"("recipe_id");

-- AddForeignKey
ALTER TABLE "recipes_am" ADD CONSTRAINT "recipes_am_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
