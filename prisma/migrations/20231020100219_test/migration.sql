/*
  Warnings:

  - You are about to drop the column `author_id` on the `Vote` table. All the data in the column will be lost.
  - Added the required column `positivity` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Vote` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_author_id_fkey";

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "positivity" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Vote" DROP COLUMN "author_id",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
