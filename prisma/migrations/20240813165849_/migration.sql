-- DropForeignKey
ALTER TABLE `variantes` DROP FOREIGN KEY `prodt_id`;

-- AddForeignKey
ALTER TABLE `variantes` ADD CONSTRAINT `prodt_id` FOREIGN KEY (`prodt_id`) REFERENCES `produtos`(`prodt_id`) ON DELETE CASCADE ON UPDATE CASCADE;
