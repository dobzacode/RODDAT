/*
  Warnings:

  - You are about to drop the `Photo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_user_id_fkey";

-- AlterTable
ALTER TABLE "Community" ADD COLUMN     "picture" TEXT;

-- DropTable
DROP TABLE "Photo";
