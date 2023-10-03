/*
  Warnings:

  - Made the column `community_id` on table `CommunityUser` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "CommunityUser" DROP CONSTRAINT "CommunityUser_community_id_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_community_id_fkey";

-- AlterTable
ALTER TABLE "CommunityUser" ALTER COLUMN "community_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "community_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "CommunityUser" ADD CONSTRAINT "CommunityUser_community_id_fkey" FOREIGN KEY ("community_id") REFERENCES "Community"("community_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_community_id_fkey" FOREIGN KEY ("community_id") REFERENCES "Community"("community_id") ON DELETE SET NULL ON UPDATE CASCADE;
