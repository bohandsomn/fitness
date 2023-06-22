-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_setId_fkey";

-- CreateTable
CREATE TABLE "_ExerciseToSet" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ExerciseToSet_AB_unique" ON "_ExerciseToSet"("A", "B");

-- CreateIndex
CREATE INDEX "_ExerciseToSet_B_index" ON "_ExerciseToSet"("B");

-- AddForeignKey
ALTER TABLE "_ExerciseToSet" ADD CONSTRAINT "_ExerciseToSet_A_fkey" FOREIGN KEY ("A") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToSet" ADD CONSTRAINT "_ExerciseToSet_B_fkey" FOREIGN KEY ("B") REFERENCES "Set"("id") ON DELETE CASCADE ON UPDATE CASCADE;
