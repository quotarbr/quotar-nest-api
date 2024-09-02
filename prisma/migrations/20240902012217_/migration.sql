/*
  Warnings:

  - You are about to alter the column `lojst_status` on the `lojistas` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(5))` to `Enum(EnumId(2))`.
  - You are about to alter the column `usr_status` on the `usuarios` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(4))` to `Enum(EnumId(5))`.

*/
-- AlterTable
ALTER TABLE `lojistas` MODIFY `lojst_status` ENUM('ativo', 'liberacao', 'inativo') NOT NULL DEFAULT 'liberacao';

-- AlterTable
ALTER TABLE `usuarios` MODIFY `usr_status` ENUM('ativo', 'liberacao', 'inativo') NULL DEFAULT 'liberacao';
