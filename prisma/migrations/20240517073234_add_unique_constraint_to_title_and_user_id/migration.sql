/*
  Warnings:

  - A unique constraint covering the columns `[title,userId]` on the table `tasks` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "tasks_title_key";

-- CreateIndex
CREATE UNIQUE INDEX "tasks_title_userId_key" ON "tasks"("title", "userId");
