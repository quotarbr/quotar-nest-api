/*
  Warnings:

  - You are about to drop the column `usr_token_recuperaca` on the `usuarios` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `usuarios` DROP COLUMN `usr_token_recuperaca`,
    ADD COLUMN `usr_token_recuperacao` VARCHAR(255) NULL;
