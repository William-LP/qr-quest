/*
  Warnings:

  - Added the required column `rank` to the `Checkpoint` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Checkpoint" ADD COLUMN     "rank" INTEGER NOT NULL;
