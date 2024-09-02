/*
  Warnings:

  - You are about to drop the column `lojst_loguin` on the `lojistas` table. All the data in the column will be lost.
  - Added the required column `lojst_login` to the `lojistas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `lojistas` DROP COLUMN `lojst_loguin`,
    ADD COLUMN `lojst_login` VARCHAR(50) NOT NULL;
