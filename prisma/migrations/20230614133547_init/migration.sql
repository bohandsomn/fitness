-- CreateTable
CREATE TABLE "Repetitions" (
    "id" SERIAL NOT NULL,
    "difficulty" "Difficulty" NOT NULL,
    "value" INTEGER NOT NULL,
    "exerciseId" INTEGER NOT NULL,

    CONSTRAINT "Repetitions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Repetitions" ADD CONSTRAINT "Repetitions_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
