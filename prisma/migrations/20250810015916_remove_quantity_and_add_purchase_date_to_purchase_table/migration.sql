/*
  Warnings:

  - You are about to drop the column `quantity` on the `purchase` table. All the data in the column will be lost.
  - Added the required column `purchaseDate` to the `purchase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."purchase" DROP COLUMN "quantity",
ADD COLUMN     "purchaseDate" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "address" DROP NOT NULL;
