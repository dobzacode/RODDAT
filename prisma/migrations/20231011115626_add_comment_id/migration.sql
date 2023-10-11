/*
  Warnings:

  - You are about to drop the `_CommentToVote` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `comment_id` to the `Vote` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_CommentToVote" DROP CONSTRAINT "_CommentToVote_A_fkey";

-- DropForeignKey
ALTER TABLE "_CommentToVote" DROP CONSTRAINT "_CommentToVote_B_fkey";

-- AlterTable
ALTER TABLE "Vote" ADD COLUMN     "comment_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "_CommentToVote";

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "Comment"("comment_id") ON DELETE RESTRICT ON UPDATE CASCADE;
