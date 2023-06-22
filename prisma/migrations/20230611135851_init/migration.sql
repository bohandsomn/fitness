/*
  Warnings:

  - You are about to drop the column `goal` on the `User` table. All the data in the column will be lost.
  - Added the required column `goalDate` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `goalWeight` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "goal",
ADD COLUMN     "goalDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "goalWeight" INTEGER NOT NULL;
