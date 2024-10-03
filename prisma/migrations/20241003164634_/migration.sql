/*
  Warnings:

  - You are about to drop the column `lojst_token_inspiracao` on the `lojistas` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `lojistas` DROP COLUMN `lojst_token_inspiracao`,
    ADD COLUMN `lojst_token_expiracao` VARCHAR(255) NULL;
