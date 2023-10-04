-- CreateEnum
CREATE TYPE "Visiblity" AS ENUM ('PUBLIC', 'RESTRICTED', 'PRIVATE');

-- AlterTable
ALTER TABLE "Community" ADD COLUMN     "visibility" "Visiblity" NOT NULL DEFAULT 'PUBLIC';
