-- CreateTable
CREATE TABLE "Checkpoint" (
    "id" TEXT NOT NULL,
    "hint" TEXT NOT NULL DEFAULT '',
    "name" TEXT NOT NULL DEFAULT '',
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "adventureId" TEXT NOT NULL,

    CONSTRAINT "Checkpoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Adventure" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Adventure_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Checkpoint_id_key" ON "Checkpoint"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Adventure_id_key" ON "Adventure"("id");

-- AddForeignKey
ALTER TABLE "Checkpoint" ADD CONSTRAINT "Checkpoint_adventureId_fkey" FOREIGN KEY ("adventureId") REFERENCES "Adventure"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
