-- CreateTable
CREATE TABLE `Agente` (
    `age_id` INTEGER NOT NULL AUTO_INCREMENT,
    `age_nome` VARCHAR(100) NULL,
    `age_login` VARCHAR(100) NULL,
    `age_senha_hash` VARCHAR(255) NULL,
    `age_web_token` VARCHAR(255) NULL,

    PRIMARY KEY (`age_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AgentesPermissoes` (
    `perm_id` INTEGER NOT NULL AUTO_INCREMENT,
    `perm_nome` VARCHAR(100) NULL,

    PRIMARY KEY (`perm_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AgentePermissao` (
    `age_id` INTEGER NOT NULL,
    `perm_id` INTEGER NOT NULL,

    PRIMARY KEY (`age_id`, `perm_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AgentePermissao` ADD CONSTRAINT `AgentePermissao_age_id_fkey` FOREIGN KEY (`age_id`) REFERENCES `Agente`(`age_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AgentePermissao` ADD CONSTRAINT `AgentePermissao_perm_id_fkey` FOREIGN KEY (`perm_id`) REFERENCES `AgentesPermissoes`(`perm_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
