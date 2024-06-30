-- CreateTable
CREATE TABLE `MaterialsOnStore` (
    `materialId` INTEGER NOT NULL,
    `storeId` INTEGER NOT NULL,
    `price` INTEGER NOT NULL,
    `amount` INTEGER NOT NULL,
    `unit` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`materialId`, `storeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MaterialsOnStore` ADD CONSTRAINT `MaterialsOnStore_materialId_fkey` FOREIGN KEY (`materialId`) REFERENCES `materials`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MaterialsOnStore` ADD CONSTRAINT `MaterialsOnStore_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `stores`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
