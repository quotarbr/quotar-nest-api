/*
  Warnings:

  - You are about to drop the column `tp_id` on the `produtos` table. All the data in the column will be lost.
  - You are about to drop the column `cat_id` on the `tipos` table. All the data in the column will be lost.
  - You are about to drop the column `vrnt_opcoes` on the `variantes` table. All the data in the column will be lost.
  - Added the required column `est_sigla` to the `estados` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `opcoes` DROP FOREIGN KEY `fk_prodt_id`;

-- DropForeignKey
ALTER TABLE `produtos` DROP FOREIGN KEY `fk_tp_id`;

-- DropForeignKey
ALTER TABLE `tipos` DROP FOREIGN KEY `cat_id`;

-- AlterTable
ALTER TABLE `estados` ADD COLUMN `est_sigla` VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE `opcoes` MODIFY `prodt_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `produtos` DROP COLUMN `tp_id`;

-- AlterTable
ALTER TABLE `tipos` DROP COLUMN `cat_id`;

-- AlterTable
ALTER TABLE `variantes` DROP COLUMN `vrnt_opcoes`;

-- CreateTable
CREATE TABLE `agente` (
    `age_id` INTEGER NOT NULL AUTO_INCREMENT,
    `age_nome` VARCHAR(100) NULL,
    `age_login` VARCHAR(100) NULL,
    `age_senha_hash` VARCHAR(255) NULL,
    `age_web_token` VARCHAR(255) NULL,

    PRIMARY KEY (`age_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `agentes_permissoes` (
    `perm_id` INTEGER NOT NULL AUTO_INCREMENT,
    `perm_nome` VARCHAR(100) NULL,

    PRIMARY KEY (`perm_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `agente_permissao` (
    `age_id` INTEGER NOT NULL,
    `perm_id` INTEGER NOT NULL,

    PRIMARY KEY (`age_id`, `perm_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `produto_tipos` (
    `prod_id` INTEGER NOT NULL,
    `tp_id` INTEGER NOT NULL,

    PRIMARY KEY (`prod_id`, `tp_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipo_categorias` (
    `tp_id` INTEGER NOT NULL,
    `cat_id` INTEGER NOT NULL,

    PRIMARY KEY (`tp_id`, `cat_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `variante_opcoes` (
    `vrnt_id` INTEGER NOT NULL,
    `opc_id` INTEGER NOT NULL,

    PRIMARY KEY (`vrnt_id`, `opc_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `agente_permissao` ADD CONSTRAINT `agente_permissao_age_id_fkey` FOREIGN KEY (`age_id`) REFERENCES `agente`(`age_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `agente_permissao` ADD CONSTRAINT `agente_permissao_perm_id_fkey` FOREIGN KEY (`perm_id`) REFERENCES `agentes_permissoes`(`perm_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `produto_tipos` ADD CONSTRAINT `produto_tipos_prod_id_fkey` FOREIGN KEY (`prod_id`) REFERENCES `produtos`(`prodt_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `produto_tipos` ADD CONSTRAINT `produto_tipos_tp_id_fkey` FOREIGN KEY (`tp_id`) REFERENCES `tipos`(`tp_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tipo_categorias` ADD CONSTRAINT `tipo_categorias_tp_id_fkey` FOREIGN KEY (`tp_id`) REFERENCES `tipos`(`tp_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tipo_categorias` ADD CONSTRAINT `tipo_categorias_cat_id_fkey` FOREIGN KEY (`cat_id`) REFERENCES `categorias`(`cat_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `variante_opcoes` ADD CONSTRAINT `variante_opcoes_vrnt_id_fkey` FOREIGN KEY (`vrnt_id`) REFERENCES `variantes`(`vrnt_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `variante_opcoes` ADD CONSTRAINT `variante_opcoes_opc_id_fkey` FOREIGN KEY (`opc_id`) REFERENCES `opcoes`(`opc_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `opcoes` ADD CONSTRAINT `fk_prodt_id` FOREIGN KEY (`prodt_id`) REFERENCES `produtos`(`prodt_id`) ON DELETE SET NULL ON UPDATE RESTRICT;
