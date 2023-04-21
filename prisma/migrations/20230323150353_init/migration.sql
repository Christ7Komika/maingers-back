-- DropForeignKey
ALTER TABLE "InstantMessage" DROP CONSTRAINT "InstantMessage_operatorId_fkey";

-- AlterTable
ALTER TABLE "InstantMessage" ALTER COLUMN "operatorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "InstantMessage" ADD CONSTRAINT "InstantMessage_operatorId_fkey" FOREIGN KEY ("operatorId") REFERENCES "Operator"("operatorSocketId") ON DELETE SET NULL ON UPDATE CASCADE;
