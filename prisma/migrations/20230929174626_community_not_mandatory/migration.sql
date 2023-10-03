-- DropForeignKey
ALTER TABLE "CommunityUser" DROP CONSTRAINT "CommunityUser_community_id_fkey";

-- AlterTable
ALTER TABLE "CommunityUser" ALTER COLUMN "community_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "CommunityUser" ADD CONSTRAINT "CommunityUser_community_id_fkey" FOREIGN KEY ("community_id") REFERENCES "Community"("community_id") ON DELETE SET NULL ON UPDATE CASCADE;
