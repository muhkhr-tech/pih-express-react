/*
  Warnings:

  - You are about to drop the `MaterialsOnStore` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MenusOnSellings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `customers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sellings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `stores` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `MaterialsOnStore` DROP FOREIGN KEY `MaterialsOnStore_materialId_fkey`;

-- DropForeignKey
ALTER TABLE `MaterialsOnStore` DROP FOREIGN KEY `MaterialsOnStore_storeId_fkey`;

-- DropForeignKey
ALTER TABLE `MenusOnSellings` DROP FOREIGN KEY `MenusOnSellings_menuId_fkey`;

-- DropForeignKey
ALTER TABLE `MenusOnSellings` DROP FOREIGN KEY `MenusOnSellings_sellingId_fkey`;

-- DropTable
DROP TABLE `MaterialsOnStore`;

-- DropTable
DROP TABLE `MenusOnSellings`;

-- DropTable
DROP TABLE `customers`;

-- DropTable
DROP TABLE `sellings`;

-- DropTable
DROP TABLE `stores`;

-- CreateTable
CREATE TABLE `sales` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `saleDate` DATETIME(3) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `customerName` VARCHAR(255) NOT NULL,
    `customerPhone` VARCHAR(15) NOT NULL,
    `customerAddress` VARCHAR(255) NOT NULL,
    `ongkir` INTEGER NOT NULL DEFAULT 0,
    `price` INTEGER NOT NULL DEFAULT 0,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MenusOnSales` (
    `menuId` INTEGER NOT NULL,
    `saleId` INTEGER NOT NULL,
    `price` INTEGER NOT NULL,
    `amount` INTEGER NOT NULL,
    `unit` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`menuId`, `saleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MenusOnSales` ADD CONSTRAINT `MenusOnSales_menuId_fkey` FOREIGN KEY (`menuId`) REFERENCES `menus`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MenusOnSales` ADD CONSTRAINT `MenusOnSales_saleId_fkey` FOREIGN KEY (`saleId`) REFERENCES `sales`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
