-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_comment_id_fkey";

-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_post_id_fkey";

-- AlterTable
ALTER TABLE "Vote" ALTER COLUMN "post_id" DROP NOT NULL,
ALTER COLUMN "comment_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("post_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "Comment"("comment_id") ON DELETE SET NULL ON UPDATE CASCADE;
