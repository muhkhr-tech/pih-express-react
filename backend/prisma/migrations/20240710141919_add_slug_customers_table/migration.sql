/*
  Warnings:

  - You are about to alter the column `name` on the `customers` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(50)`.
  - Added the required column `slug` to the `customers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `customers` ADD COLUMN `slug` VARCHAR(320) NOT NULL,
    MODIFY `name` VARCHAR(50) NOT NULL;
