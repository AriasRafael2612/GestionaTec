/*
  Warnings:

  - Added the required column `descripcion` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `event` ADD COLUMN `descripcion` VARCHAR(191) NOT NULL,
    ADD COLUMN `type` ENUM('INDIVIDUAL', 'TEAM') NOT NULL;
