-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "Exercise" (
    "id" SERIAL NOT NULL,
    "calories" DOUBLE PRECISION NOT NULL,
    "header" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "demonstration" TEXT NOT NULL,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Set" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "demonstration" TEXT NOT NULL,

    CONSTRAINT "Set_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "difficulty" "Difficulty" NOT NULL,
    "height" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "goalWeight" INTEGER NOT NULL,
    "goalDate" TIMESTAMP(3) NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gender" "Gender" NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "registeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "link" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "refreshToken" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BodyPart" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "BodyPart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Type" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "History" (
    "id" SERIAL NOT NULL,
    "completedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "exerciseId" INTEGER NOT NULL,

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Repetitions" (
    "id" SERIAL NOT NULL,
    "difficulty" "Difficulty" NOT NULL,
    "value" INTEGER NOT NULL,
    "exerciseId" INTEGER NOT NULL,

    CONSTRAINT "Repetitions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ExerciseToSet" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ExerciseToType" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_SetToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_BodyPartToExercise" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Exercise_demonstration_key" ON "Exercise"("demonstration");

-- CreateIndex
CREATE UNIQUE INDEX "Set_demonstration_key" ON "Set"("demonstration");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_link_key" ON "User"("link");

-- CreateIndex
CREATE UNIQUE INDEX "BodyPart_value_key" ON "BodyPart"("value");

-- CreateIndex
CREATE UNIQUE INDEX "Type_value_key" ON "Type"("value");

-- CreateIndex
CREATE UNIQUE INDEX "_ExerciseToSet_AB_unique" ON "_ExerciseToSet"("A", "B");

-- CreateIndex
CREATE INDEX "_ExerciseToSet_B_index" ON "_ExerciseToSet"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ExerciseToType_AB_unique" ON "_ExerciseToType"("A", "B");

-- CreateIndex
CREATE INDEX "_ExerciseToType_B_index" ON "_ExerciseToType"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SetToUser_AB_unique" ON "_SetToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_SetToUser_B_index" ON "_SetToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BodyPartToExercise_AB_unique" ON "_BodyPartToExercise"("A", "B");

-- CreateIndex
CREATE INDEX "_BodyPartToExercise_B_index" ON "_BodyPartToExercise"("B");

-- AddForeignKey
ALTER TABLE "Repetitions" ADD CONSTRAINT "Repetitions_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToSet" ADD CONSTRAINT "_ExerciseToSet_A_fkey" FOREIGN KEY ("A") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToSet" ADD CONSTRAINT "_ExerciseToSet_B_fkey" FOREIGN KEY ("B") REFERENCES "Set"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToType" ADD CONSTRAINT "_ExerciseToType_A_fkey" FOREIGN KEY ("A") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToType" ADD CONSTRAINT "_ExerciseToType_B_fkey" FOREIGN KEY ("B") REFERENCES "Type"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SetToUser" ADD CONSTRAINT "_SetToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Set"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SetToUser" ADD CONSTRAINT "_SetToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BodyPartToExercise" ADD CONSTRAINT "_BodyPartToExercise_A_fkey" FOREIGN KEY ("A") REFERENCES "BodyPart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BodyPartToExercise" ADD CONSTRAINT "_BodyPartToExercise_B_fkey" FOREIGN KEY ("B") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;
