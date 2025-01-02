/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Post_name_key` ON `Post`(`name`);
