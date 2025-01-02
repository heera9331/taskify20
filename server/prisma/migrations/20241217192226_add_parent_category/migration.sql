-- AlterTable
ALTER TABLE `category` ADD COLUMN `parentId` INTEGER NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE `Category` ADD CONSTRAINT `Category_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `Category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
