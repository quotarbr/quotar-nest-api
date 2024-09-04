/*
  Warnings:

  - A unique constraint covering the columns `[lojst_email]` on the table `lojistas` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[lojst_login]` on the table `lojistas` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[usr_email]` on the table `usuarios` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `lojistas_lojst_email_key` ON `lojistas`(`lojst_email`);

-- CreateIndex
CREATE UNIQUE INDEX `lojistas_lojst_login_key` ON `lojistas`(`lojst_login`);

-- CreateIndex
CREATE UNIQUE INDEX `usuarios_usr_email_key` ON `usuarios`(`usr_email`);
