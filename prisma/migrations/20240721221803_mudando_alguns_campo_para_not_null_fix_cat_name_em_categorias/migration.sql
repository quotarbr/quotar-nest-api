/*
  Warnings:

  - You are about to drop the column `nome` on the `categorias` table. All the data in the column will be lost.
  - Made the column `bai_nome` on table `bairros` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cid_id` on table `bairros` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cid_nome` on table `cidades` required. This step will fail if there are existing NULL values in that column.
  - Made the column `est_id` on table `cidades` required. This step will fail if there are existing NULL values in that column.
  - Made the column `est_nome` on table `estados` required. This step will fail if there are existing NULL values in that column.
  - Made the column `loj_nome` on table `lojas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `loj_cnpj` on table `lojas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `loj_telefone` on table `lojas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `loj_email` on table `lojas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `loj_cep` on table `lojas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `loj_endereco` on table `lojas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `loj_data_cadastro` on table `lojas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cid_id` on table `lojas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bai_id` on table `lojas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `est_id` on table `lojas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lojst_id` on table `lojas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lojst_nome` on table `lojistas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lojst_cpf` on table `lojistas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lojst_telefone` on table `lojistas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lojst_email` on table `lojistas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lojst_data_cadastro` on table `lojistas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lojst_status` on table `lojistas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lojst_loguin` on table `lojistas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lojst_senha_hash` on table `lojistas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lojst_token_inspiracao` on table `lojistas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lojst_token_recuperacao` on table `lojistas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cid_id` on table `lojistas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bai_id` on table `lojistas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `est_id` on table `lojistas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `opc_nome` on table `opcoes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `prodt_nome` on table `produtos` required. This step will fail if there are existing NULL values in that column.
  - Made the column `loj_id` on table `produtos` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tp_id` on table `produtos` required. This step will fail if there are existing NULL values in that column.
  - Made the column `prodt_status` on table `produtos` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tp_nome` on table `tipos` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cat_id` on table `tipos` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `bairros` DROP FOREIGN KEY `cid_id`;

-- DropForeignKey
ALTER TABLE `cidades` DROP FOREIGN KEY `est_id`;

-- DropForeignKey
ALTER TABLE `lojas` DROP FOREIGN KEY `fk_loj_lojst_id`;

-- DropForeignKey
ALTER TABLE `lojas` DROP FOREIGN KEY `lojas_ibfk_1`;

-- DropForeignKey
ALTER TABLE `lojas` DROP FOREIGN KEY `lojas_ibfk_2`;

-- DropForeignKey
ALTER TABLE `lojas` DROP FOREIGN KEY `lojas_ibfk_3`;

-- DropForeignKey
ALTER TABLE `lojistas` DROP FOREIGN KEY `lojistas_ibfk_1`;

-- DropForeignKey
ALTER TABLE `lojistas` DROP FOREIGN KEY `lojistas_ibfk_2`;

-- DropForeignKey
ALTER TABLE `lojistas` DROP FOREIGN KEY `lojistas_ibfk_3`;

-- DropForeignKey
ALTER TABLE `produtos` DROP FOREIGN KEY `fk_tp_id`;

-- DropForeignKey
ALTER TABLE `produtos` DROP FOREIGN KEY `loj_id`;

-- DropForeignKey
ALTER TABLE `tipos` DROP FOREIGN KEY `cat_id`;

-- AlterTable
ALTER TABLE `bairros` MODIFY `bai_nome` VARCHAR(50) NOT NULL,
    MODIFY `cid_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `categorias` DROP COLUMN `nome`,
    ADD COLUMN `cat_nome` VARCHAR(150) NOT NULL DEFAULT 'defaul_value';

-- AlterTable
ALTER TABLE `cidades` MODIFY `cid_nome` VARCHAR(50) NOT NULL,
    MODIFY `est_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `estados` MODIFY `est_nome` VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE `lojas` MODIFY `loj_nome` VARCHAR(100) NOT NULL,
    MODIFY `loj_cnpj` VARCHAR(14) NOT NULL,
    MODIFY `loj_telefone` VARCHAR(20) NOT NULL,
    MODIFY `loj_email` VARCHAR(150) NOT NULL,
    MODIFY `loj_cep` VARCHAR(10) NOT NULL,
    MODIFY `loj_endereco` VARCHAR(150) NOT NULL,
    MODIFY `loj_data_cadastro` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `cid_id` INTEGER NOT NULL,
    MODIFY `bai_id` INTEGER NOT NULL,
    MODIFY `est_id` INTEGER NOT NULL,
    MODIFY `lojst_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `lojistas` MODIFY `lojst_nome` VARCHAR(100) NOT NULL,
    MODIFY `lojst_cpf` VARCHAR(11) NOT NULL,
    MODIFY `lojst_telefone` VARCHAR(20) NOT NULL,
    MODIFY `lojst_email` VARCHAR(150) NOT NULL,
    MODIFY `lojst_data_cadastro` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `lojst_status` ENUM('ativo', 'pendente', 'inativo') NOT NULL,
    MODIFY `lojst_loguin` VARCHAR(50) NOT NULL,
    MODIFY `lojst_senha_hash` VARCHAR(255) NOT NULL,
    MODIFY `lojst_token_inspiracao` VARCHAR(255) NOT NULL,
    MODIFY `lojst_token_recuperacao` VARCHAR(255) NOT NULL,
    MODIFY `cid_id` INTEGER NOT NULL,
    MODIFY `bai_id` INTEGER NOT NULL,
    MODIFY `est_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `opcoes` MODIFY `opc_nome` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `produtos` MODIFY `prodt_nome` VARCHAR(100) NOT NULL,
    MODIFY `loj_id` INTEGER NOT NULL,
    MODIFY `tp_id` INTEGER NOT NULL,
    MODIFY `prodt_status` ENUM('ativo', 'liberacao', 'inativo') NOT NULL;

-- AlterTable
ALTER TABLE `tipos` MODIFY `tp_nome` VARCHAR(150) NOT NULL,
    MODIFY `cat_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `bairros` ADD CONSTRAINT `cid_id` FOREIGN KEY (`cid_id`) REFERENCES `cidades`(`cid_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cidades` ADD CONSTRAINT `est_id` FOREIGN KEY (`est_id`) REFERENCES `estados`(`est_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE `produtos` ADD CONSTRAINT `fk_tp_id` FOREIGN KEY (`tp_id`) REFERENCES `tipos`(`tp_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `produtos` ADD CONSTRAINT `loj_id` FOREIGN KEY (`loj_id`) REFERENCES `lojas`(`loj_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `tipos` ADD CONSTRAINT `cat_id` FOREIGN KEY (`cat_id`) REFERENCES `categorias`(`cat_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
