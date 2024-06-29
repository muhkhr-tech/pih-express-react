-- CreateTable
CREATE TABLE `MenusOnSellings` (
    `menuId` INTEGER NOT NULL,
    `sellingId` INTEGER NOT NULL,
    `price` INTEGER NOT NULL,
    `unit` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`menuId`, `sellingId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MenusOnSellings` ADD CONSTRAINT `MenusOnSellings_menuId_fkey` FOREIGN KEY (`menuId`) REFERENCES `menus`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MenusOnSellings` ADD CONSTRAINT `MenusOnSellings_sellingId_fkey` FOREIGN KEY (`sellingId`) REFERENCES `sellings`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
