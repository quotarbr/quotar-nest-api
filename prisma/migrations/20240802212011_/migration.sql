/*
  Warnings:

  - Made the column `tp_prec_nome` on table `tipos_precos` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `tipos_precos` MODIFY `tp_prec_nome` VARCHAR(100) NOT NULL;
