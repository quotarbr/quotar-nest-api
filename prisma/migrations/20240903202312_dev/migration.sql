-- CreateTable
CREATE TABLE `bairros` (
    `bai_id` INTEGER NOT NULL AUTO_INCREMENT,
    `bai_nome` VARCHAR(50) NOT NULL,
    `cid_id` INTEGER NOT NULL,

    INDEX `cid_id`(`cid_id`),
    PRIMARY KEY (`bai_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categorias` (
    `cat_id` INTEGER NOT NULL AUTO_INCREMENT,
    `cat_nome` VARCHAR(150) NOT NULL,

    PRIMARY KEY (`cat_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cidades` (
    `cid_id` INTEGER NOT NULL AUTO_INCREMENT,
    `cid_nome` VARCHAR(50) NOT NULL,
    `est_id` INTEGER NOT NULL,

    INDEX `est_id`(`est_id`),
    PRIMARY KEY (`cid_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `estados` (
    `est_id` INTEGER NOT NULL AUTO_INCREMENT,
    `est_nome` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`est_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `faturas` (
    `fatr_id` INTEGER NOT NULL AUTO_INCREMENT,
    `fatr_numero` INTEGER NULL,
    `fatr_data_emissao` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fatr_data_vencimento` DATETIME(0) NULL,
    `fatr_total` DECIMAL(10, 2) NULL,
    `fatr_pagmt_metodo` ENUM('cartao_credito', 'cartao_debito', 'transferencia', 'boleto', 'pix') NULL,
    `fatr_pagmt_data` DATETIME(0) NULL,
    `fatr_status` ENUM('ativa', 'inativa', 'pendente') NULL,
    `lojst_id` INTEGER NULL,
    `pln_id` INTEGER NULL,

    INDEX `lojst_id`(`lojst_id`),
    INDEX `pln_id`(`pln_id`),
    PRIMARY KEY (`fatr_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lojas` (
    `loj_id` INTEGER NOT NULL AUTO_INCREMENT,
    `loj_nome` VARCHAR(100) NOT NULL,
    `loj_cnpj` VARCHAR(14) NOT NULL,
    `loj_logo` VARCHAR(255) NULL,
    `loj_slogan` VARCHAR(255) NULL,
    `loj_telefone` VARCHAR(20) NOT NULL,
    `loj_email` VARCHAR(150) NOT NULL,
    `loj_text_sobre` VARCHAR(255) NULL,
    `loj_cep` VARCHAR(10) NOT NULL,
    `loj_endereco` VARCHAR(150) NOT NULL,
    `loj_data_cadastro` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `cid_id` INTEGER NOT NULL,
    `bai_id` INTEGER NOT NULL,
    `est_id` INTEGER NOT NULL,
    `lojst_id` INTEGER NOT NULL,

    INDEX `bai_id`(`bai_id`),
    INDEX `cid_id`(`cid_id`),
    INDEX `est_id`(`est_id`),
    INDEX `lojst_id`(`lojst_id`),
    PRIMARY KEY (`loj_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lojistas` (
    `lojst_id` INTEGER NOT NULL AUTO_INCREMENT,
    `lojst_nome` VARCHAR(100) NOT NULL,
    `lojst_cpf` VARCHAR(11) NOT NULL,
    `lojst_img_perfil` VARCHAR(255) NULL,
    `lojst_telefone` VARCHAR(20) NOT NULL,
    `lojst_email` VARCHAR(150) NOT NULL,
    `lojst_data_cadastro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `lojst_cep` VARCHAR(10) NULL,
    `lojst_endereco` VARCHAR(150) NULL,
    `lojst_status` ENUM('ativo', 'pendente', 'inativo') NOT NULL DEFAULT 'pendente',
    `lojst_login` VARCHAR(50) NOT NULL,
    `lojst_web_token` VARCHAR(255) NULL,
    `lojst_senha_hash` VARCHAR(255) NOT NULL,
    `lojst_token_inspiracao` VARCHAR(255) NULL,
    `lojst_token_recuperacao` VARCHAR(255) NULL,
    `cid_id` INTEGER NOT NULL,
    `bai_id` INTEGER NOT NULL,
    `est_id` INTEGER NOT NULL,
    `lojst_loja_parceira` LONGTEXT NULL,

    INDEX `bai_id`(`bai_id`),
    INDEX `cid_id`(`cid_id`),
    INDEX `est_id`(`est_id`),
    PRIMARY KEY (`lojst_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `opcoes` (
    `opc_id` INTEGER NOT NULL AUTO_INCREMENT,
    `opc_nome` VARCHAR(100) NOT NULL,
    `opc_valores` LONGTEXT NOT NULL,
    `prodt_id` INTEGER NOT NULL,

    INDEX `fk_prodt_id`(`prodt_id`),
    PRIMARY KEY (`opc_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orcamento_variantes` (
    `orc_vrnt_id` INTEGER NOT NULL AUTO_INCREMENT,
    `orc_vrnt_quantidade_prodt` INTEGER UNSIGNED NULL,
    `orc_vrnt_preco_total` DECIMAL(10, 2) NULL,
    `loj_id` INTEGER NULL,
    `orcto_id` INTEGER NULL,
    `vrnt_id` INTEGER NOT NULL,

    INDEX `loj_id`(`loj_id`),
    INDEX `orcto_id`(`orcto_id`),
    INDEX `vrnt_id`(`vrnt_id`),
    PRIMARY KEY (`orc_vrnt_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orcamentos` (
    `orcto_id` INTEGER NOT NULL AUTO_INCREMENT,
    `orcto_data_emissao` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `orcto_quantidade_prodt` INTEGER UNSIGNED NULL,
    `orcto_total` DECIMAL(10, 2) NULL,
    `orcto_fav` BOOLEAN NULL,
    `orcto_creatAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `orcto_updateAt` DATETIME(3) NOT NULL,
    `usr_id` INTEGER NULL,
    `vist_id` INTEGER NULL,

    INDEX `usr_id`(`usr_id`),
    INDEX `vist_id`(`vist_id`),
    PRIMARY KEY (`orcto_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `permissoes_notificacoes` (
    `permi_id` INTEGER NOT NULL AUTO_INCREMENT,
    `permi_tipo` ENUM('orcamento') NULL,
    `permi_ativa` BOOLEAN NULL DEFAULT true,
    `lojst_id` INTEGER NULL,
    `usr_id` INTEGER NULL,

    INDEX `lojst_id`(`lojst_id`),
    INDEX `usr_id`(`usr_id`),
    PRIMARY KEY (`permi_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `planos` (
    `pln_id` INTEGER NOT NULL AUTO_INCREMENT,
    `pln_nome` VARCHAR(100) NULL,
    `pln_desc` VARCHAR(150) NULL,
    `pln_preco` DECIMAL(10, 2) NULL,

    PRIMARY KEY (`pln_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `produtos` (
    `prodt_id` INTEGER NOT NULL AUTO_INCREMENT,
    `prodt_fotos` LONGTEXT NULL,
    `prodt_nome` VARCHAR(100) NOT NULL,
    `prodt_descricao` VARCHAR(255) NULL,
    `prodt_created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `prodt_updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `loj_id` INTEGER NOT NULL,
    `tp_id` INTEGER NOT NULL,
    `tp_prec_id` INTEGER NOT NULL,
    `prodt_status` ENUM('ativo', 'liberacao', 'inativo') NOT NULL,

    INDEX `loj_id`(`loj_id`),
    INDEX `fk_tp_id`(`tp_id`),
    INDEX `tp_prec_id`(`tp_prec_id`),
    PRIMARY KEY (`prodt_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipos` (
    `tp_id` INTEGER NOT NULL AUTO_INCREMENT,
    `tp_nome` VARCHAR(150) NOT NULL,
    `cat_id` INTEGER NOT NULL,

    INDEX `cat_id`(`cat_id`),
    PRIMARY KEY (`tp_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipos_precos` (
    `tp_prec_id` INTEGER NOT NULL AUTO_INCREMENT,
    `tp_prec_nome` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`tp_prec_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuarios` (
    `usr_id` INTEGER NOT NULL AUTO_INCREMENT,
    `usr_nome` VARCHAR(100) NULL,
    `usr_cpf` VARCHAR(11) NULL,
    `usr_img_perfil` VARCHAR(255) NULL,
    `usr_telefone` VARCHAR(20) NULL,
    `usr_email` VARCHAR(150) NULL,
    `usr_data_cadastro` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `usr_cep` VARCHAR(10) NULL,
    `usr_endereco` VARCHAR(150) NULL,
    `usr_status` ENUM('ativo', 'inativo', 'pendente') NULL,
    `cid_id` INTEGER NULL,
    `bai_id` INTEGER NULL,
    `est_id` INTEGER NULL,
    `usr_prod_favoritos` LONGTEXT NULL,
    `usr_loj_favoritas` LONGTEXT NULL,
    `usr_login` VARCHAR(50) NULL,
    `usr_senha_hash` VARCHAR(255) NULL,
    `usr_token_inspiracao` VARCHAR(255) NULL,
    `usr_token_recuperaca` VARCHAR(255) NULL,

    INDEX `bai_id`(`bai_id`),
    INDEX `cid_id`(`cid_id`),
    INDEX `est_id`(`est_id`),
    PRIMARY KEY (`usr_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `variantes` (
    `vrnt_id` INTEGER NOT NULL AUTO_INCREMENT,
    `vrnt_fotos` LONGTEXT NULL,
    `vrnt_preco` DECIMAL(10, 2) NOT NULL,
    `vrnt_opcoes` LONGTEXT NULL,
    `prodt_id` INTEGER NOT NULL,

    INDEX `prodt_id`(`prodt_id`),
    PRIMARY KEY (`vrnt_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `visitantes` (
    `vist_id` INTEGER NOT NULL AUTO_INCREMENT,
    `vist_nome` VARCHAR(100) NULL,
    `vist_telefone` VARCHAR(20) NULL,
    `vist_email` VARCHAR(150) NULL,
    `vist_endereco` VARCHAR(150) NULL,
    `cid_id` INTEGER NULL,
    `bai_id` INTEGER NULL,
    `est_id` INTEGER NULL,

    INDEX `bai_id`(`bai_id`),
    INDEX `cid_id`(`cid_id`),
    INDEX `est_id`(`est_id`),
    PRIMARY KEY (`vist_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `bairros` ADD CONSTRAINT `cid_id` FOREIGN KEY (`cid_id`) REFERENCES `cidades`(`cid_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cidades` ADD CONSTRAINT `est_id` FOREIGN KEY (`est_id`) REFERENCES `estados`(`est_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `faturas` ADD CONSTRAINT `faturas_ibfk_1` FOREIGN KEY (`lojst_id`) REFERENCES `lojistas`(`lojst_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `faturas` ADD CONSTRAINT `faturas_ibfk_2` FOREIGN KEY (`pln_id`) REFERENCES `planos`(`pln_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `lojas` ADD CONSTRAINT `fk_loj_lojst_id` FOREIGN KEY (`lojst_id`) REFERENCES `lojistas`(`lojst_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `lojas` ADD CONSTRAINT `lojas_ibfk_1` FOREIGN KEY (`cid_id`) REFERENCES `cidades`(`cid_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `lojas` ADD CONSTRAINT `lojas_ibfk_2` FOREIGN KEY (`bai_id`) REFERENCES `bairros`(`bai_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `lojas` ADD CONSTRAINT `lojas_ibfk_3` FOREIGN KEY (`est_id`) REFERENCES `estados`(`est_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `lojistas` ADD CONSTRAINT `lojistas_ibfk_1` FOREIGN KEY (`cid_id`) REFERENCES `cidades`(`cid_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `lojistas` ADD CONSTRAINT `lojistas_ibfk_2` FOREIGN KEY (`bai_id`) REFERENCES `bairros`(`bai_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `lojistas` ADD CONSTRAINT `lojistas_ibfk_3` FOREIGN KEY (`est_id`) REFERENCES `estados`(`est_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `opcoes` ADD CONSTRAINT `fk_prodt_id` FOREIGN KEY (`prodt_id`) REFERENCES `produtos`(`prodt_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `orcamento_variantes` ADD CONSTRAINT `orcamento_variantes_ibfk_1` FOREIGN KEY (`loj_id`) REFERENCES `lojas`(`loj_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `orcamento_variantes` ADD CONSTRAINT `orcamento_variantes_ibfk_4` FOREIGN KEY (`orcto_id`) REFERENCES `orcamentos`(`orcto_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `orcamento_variantes` ADD CONSTRAINT `vrnt_id` FOREIGN KEY (`vrnt_id`) REFERENCES `variantes`(`vrnt_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `orcamentos` ADD CONSTRAINT `orcamentos_ibfk_1` FOREIGN KEY (`usr_id`) REFERENCES `usuarios`(`usr_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `orcamentos` ADD CONSTRAINT `orcamentos_ibfk_2` FOREIGN KEY (`vist_id`) REFERENCES `visitantes`(`vist_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `permissoes_notificacoes` ADD CONSTRAINT `permissoes_notificacoes_ibfk_1` FOREIGN KEY (`lojst_id`) REFERENCES `lojistas`(`lojst_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `permissoes_notificacoes` ADD CONSTRAINT `permissoes_notificacoes_ibfk_2` FOREIGN KEY (`usr_id`) REFERENCES `usuarios`(`usr_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `produtos` ADD CONSTRAINT `fk_tp_id` FOREIGN KEY (`tp_id`) REFERENCES `tipos`(`tp_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `produtos` ADD CONSTRAINT `loj_id` FOREIGN KEY (`loj_id`) REFERENCES `lojas`(`loj_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `produtos` ADD CONSTRAINT `tp_prec_id` FOREIGN KEY (`tp_prec_id`) REFERENCES `tipos_precos`(`tp_prec_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `tipos` ADD CONSTRAINT `cat_id` FOREIGN KEY (`cat_id`) REFERENCES `categorias`(`cat_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `usuarios` ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`cid_id`) REFERENCES `cidades`(`cid_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usuarios` ADD CONSTRAINT `usuarios_ibfk_2` FOREIGN KEY (`bai_id`) REFERENCES `bairros`(`bai_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usuarios` ADD CONSTRAINT `usuarios_ibfk_3` FOREIGN KEY (`est_id`) REFERENCES `estados`(`est_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `variantes` ADD CONSTRAINT `prodt_id` FOREIGN KEY (`prodt_id`) REFERENCES `produtos`(`prodt_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `visitantes` ADD CONSTRAINT `fk_bairro` FOREIGN KEY (`bai_id`) REFERENCES `bairros`(`bai_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `visitantes` ADD CONSTRAINT `fk_cidade` FOREIGN KEY (`cid_id`) REFERENCES `cidades`(`cid_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `visitantes` ADD CONSTRAINT `fk_estado` FOREIGN KEY (`est_id`) REFERENCES `estados`(`est_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
