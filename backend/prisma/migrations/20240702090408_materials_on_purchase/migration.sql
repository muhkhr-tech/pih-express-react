/*
  Warnings:

  - Added the required column `storeAddress` to the `purchases` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storeName` to the `purchases` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storePhone` to the `purchases` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `purchases` ADD COLUMN `storeAddress` VARCHAR(255) NOT NULL,
    ADD COLUMN `storeName` VARCHAR(255) NOT NULL,
    ADD COLUMN `storePhone` VARCHAR(15) NOT NULL;

-- CreateTable
CREATE TABLE `MaterialsOnPurchase` (
    `materialId` INTEGER NOT NULL,
    `purchaseId` INTEGER NOT NULL,
    `price` INTEGER NOT NULL,
    `amount` INTEGER NOT NULL,
    `unit` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`materialId`, `purchaseId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MaterialsOnPurchase` ADD CONSTRAINT `MaterialsOnPurchase_materialId_fkey` FOREIGN KEY (`materialId`) REFERENCES `materials`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MaterialsOnPurchase` ADD CONSTRAINT `MaterialsOnPurchase_purchaseId_fkey` FOREIGN KEY (`purchaseId`) REFERENCES `purchases`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
