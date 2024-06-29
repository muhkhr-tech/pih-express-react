-- CreateTable
CREATE TABLE `sellings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sellingDate` DATETIME(3) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `customerName` VARCHAR(255) NOT NULL,
    `customerPhone` VARCHAR(15) NOT NULL,
    `customerAddress` VARCHAR(255) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
