/*
  Warnings:

  - Made the column `prodt_id` on table `variantes` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `variantes` DROP FOREIGN KEY `prodt_id`;

-- AlterTable
ALTER TABLE `variantes` MODIFY `prodt_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `variantes` ADD CONSTRAINT `prodt_id` FOREIGN KEY (`prodt_id`) REFERENCES `produtos`(`prodt_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
