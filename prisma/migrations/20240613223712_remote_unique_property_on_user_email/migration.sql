-- DropForeignKey
ALTER TABLE "Adventure" DROP CONSTRAINT "Adventure_customerId_fkey";

-- DropIndex
DROP INDEX "Customer_email_key";

-- AlterTable
ALTER TABLE "Adventure" ALTER COLUMN "customerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Adventure" ADD CONSTRAINT "Adventure_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
