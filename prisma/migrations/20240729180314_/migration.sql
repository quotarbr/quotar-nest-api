-- AlterTable
ALTER TABLE `lojistas` MODIFY `lojst_status` ENUM('ativo', 'pendente', 'inativo') NOT NULL DEFAULT 'pendente',
    MODIFY `lojst_token_inspiracao` VARCHAR(255) NULL,
    MODIFY `lojst_token_recuperacao` VARCHAR(255) NULL;
