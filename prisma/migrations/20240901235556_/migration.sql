/*
  Warnings:

  - You are about to drop the column `usr_loguin` on the `usuarios` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `usuarios` DROP COLUMN `usr_loguin`;

-- AlterTable
ALTER TABLE `variantes` MODIFY `vrnt_fotos` JSON NULL,
    MODIFY `vrnt_opcoes` JSON NULL;
