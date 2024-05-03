/*
  Warnings:

  - Added the required column `edad` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefono` to the `Participant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `participant` ADD COLUMN `edad` INTEGER NOT NULL,
    ADD COLUMN `telefono` INTEGER NOT NULL;
