/*
  Warnings:

  - You are about to drop the column `tesimonial` on the `testimonials` table. All the data in the column will be lost.
  - Added the required column `testimonial` to the `testimonials` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `testimonials` DROP COLUMN `tesimonial`,
    ADD COLUMN `testimonial` VARCHAR(191) NOT NULL;
