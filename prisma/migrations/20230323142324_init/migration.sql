/*
  Warnings:

  - Made the column `operatorId` on table `InstantMessage` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "InstantMessage" DROP CONSTRAINT "InstantMessage_operatorId_fkey";

-- AlterTable
ALTER TABLE "InstantMessage" ALTER COLUMN "operatorId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "InstantMessage" ADD CONSTRAINT "InstantMessage_operatorId_fkey" FOREIGN KEY ("operatorId") REFERENCES "Operator"("operatorSocketId") ON DELETE RESTRICT ON UPDATE CASCADE;
