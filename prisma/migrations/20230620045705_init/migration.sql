/*
  Warnings:

  - You are about to drop the column `image` on the `Set` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[demonstration]` on the table `Exercise` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[demonstration]` on the table `Set` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `demonstration` to the `Set` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Set" DROP COLUMN "image",
ADD COLUMN     "demonstration" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Exercise_demonstration_key" ON "Exercise"("demonstration");

-- CreateIndex
CREATE UNIQUE INDEX "Set_demonstration_key" ON "Set"("demonstration");
