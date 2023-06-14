/*
  Warnings:

  - You are about to drop the column `dificulty` on the `User` table. All the data in the column will be lost.
  - Added the required column `difficulty` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "dificulty",
ADD COLUMN     "difficulty" "Difficulty" NOT NULL;

-- DropEnum
DROP TYPE "Dificulty";
