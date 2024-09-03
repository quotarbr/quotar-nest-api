/*
  Warnings:

  - You are about to drop the `Agente` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AgentePermissao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AgentesPermissoes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `AgentePermissao` DROP FOREIGN KEY `AgentePermissao_age_id_fkey`;

-- DropForeignKey
ALTER TABLE `AgentePermissao` DROP FOREIGN KEY `AgentePermissao_perm_id_fkey`;

-- DropTable
DROP TABLE `Agente`;

-- DropTable
DROP TABLE `AgentePermissao`;

-- DropTable
DROP TABLE `AgentesPermissoes`;

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

-- AddForeignKey
ALTER TABLE `agente_permissao` ADD CONSTRAINT `agente_permissao_age_id_fkey` FOREIGN KEY (`age_id`) REFERENCES `agente`(`age_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `agente_permissao` ADD CONSTRAINT `agente_permissao_perm_id_fkey` FOREIGN KEY (`perm_id`) REFERENCES `agentes_permissoes`(`perm_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
