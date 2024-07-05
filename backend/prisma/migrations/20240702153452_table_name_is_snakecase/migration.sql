/*
  Warnings:

  - You are about to drop the `MaterialsOnPurchase` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MenusOnSales` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `MaterialsOnPurchase` DROP FOREIGN KEY `MaterialsOnPurchase_materialId_fkey`;

-- DropForeignKey
ALTER TABLE `MaterialsOnPurchase` DROP FOREIGN KEY `MaterialsOnPurchase_purchaseId_fkey`;

-- DropForeignKey
ALTER TABLE `MenusOnSales` DROP FOREIGN KEY `MenusOnSales_menuId_fkey`;

-- DropForeignKey
ALTER TABLE `MenusOnSales` DROP FOREIGN KEY `MenusOnSales_saleId_fkey`;

-- DropTable
DROP TABLE `MaterialsOnPurchase`;

-- DropTable
DROP TABLE `MenusOnSales`;

-- CreateTable
CREATE TABLE `menus_on_sale` (
    `menuId` INTEGER NOT NULL,
    `saleId` INTEGER NOT NULL,
    `price` INTEGER NOT NULL,
    `amount` INTEGER NOT NULL,
    `unit` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`menuId`, `saleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `materials_on_purchase` (
    `materialId` INTEGER NOT NULL,
    `purchaseId` INTEGER NOT NULL,
    `price` INTEGER NOT NULL,
    `amount` INTEGER NOT NULL,
    `unit` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`materialId`, `purchaseId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `menus_on_sale` ADD CONSTRAINT `menus_on_sale_menuId_fkey` FOREIGN KEY (`menuId`) REFERENCES `menus`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `menus_on_sale` ADD CONSTRAINT `menus_on_sale_saleId_fkey` FOREIGN KEY (`saleId`) REFERENCES `sales`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `materials_on_purchase` ADD CONSTRAINT `materials_on_purchase_materialId_fkey` FOREIGN KEY (`materialId`) REFERENCES `materials`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `materials_on_purchase` ADD CONSTRAINT `materials_on_purchase_purchaseId_fkey` FOREIGN KEY (`purchaseId`) REFERENCES `purchases`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
