-- AlterTable
ALTER TABLE "Community" ADD COLUMN     "isNsfw" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "description" DROP NOT NULL;
