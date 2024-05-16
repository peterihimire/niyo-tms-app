/*
  Warnings:

  - The values [work,personal,urgent,home,school,other] on the enum `TaskCategory` will be removed. If these variants are still used in the database, this will fail.
  - The values [low,medium,high] on the enum `TaskPriority` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TaskCategory_new" AS ENUM ('WORK', 'PERSONAL', 'URGENT', 'HOME', 'SCHOOL', 'OTHER');
ALTER TABLE "tasks" ALTER COLUMN "category" TYPE "TaskCategory_new" USING ("category"::text::"TaskCategory_new");
ALTER TYPE "TaskCategory" RENAME TO "TaskCategory_old";
ALTER TYPE "TaskCategory_new" RENAME TO "TaskCategory";
DROP TYPE "TaskCategory_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "TaskPriority_new" AS ENUM ('LOW', 'MEDIUM', 'HIGH');
ALTER TABLE "tasks" ALTER COLUMN "priority" TYPE "TaskPriority_new" USING ("priority"::text::"TaskPriority_new");
ALTER TYPE "TaskPriority" RENAME TO "TaskPriority_old";
ALTER TYPE "TaskPriority_new" RENAME TO "TaskPriority";
DROP TYPE "TaskPriority_old";
COMMIT;
