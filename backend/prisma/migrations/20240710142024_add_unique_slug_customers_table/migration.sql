/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `customers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `customers_slug_key` ON `customers`(`slug`);
