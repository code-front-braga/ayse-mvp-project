/*
  Warnings:

  - You are about to drop the column `purchaseDate` on the `purchase` table. All the data in the column will be lost.
  - Added the required column `date` to the `purchase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."purchase" DROP COLUMN "purchaseDate",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;
