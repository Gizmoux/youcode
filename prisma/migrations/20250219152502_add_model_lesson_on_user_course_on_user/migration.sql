/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Course` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "CourseState" AS ENUM ('DRAFT', 'PUBLISHED');

-- CreateEnum
CREATE TYPE "LessonState" AS ENUM ('HIDDEN', 'PUBLISHED', 'PUBLIC');

-- CreateEnum
CREATE TYPE "Progress" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED');

-- DropForeignKey
ALTER TABLE "Authenticator" DROP CONSTRAINT "Authenticator_userId_fkey";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "updatedAt",
ADD COLUMN     "presentation" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "state" "CourseState" NOT NULL DEFAULT 'DRAFT';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Lesson" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rank" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "state" "LessonState" NOT NULL DEFAULT 'HIDDEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "courseId" TEXT NOT NULL,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LessonOnUser" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "progress" "Progress" NOT NULL DEFAULT 'NOT_STARTED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LessonOnUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseOnUser" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "canceledAt" TIMESTAMP(3),

    CONSTRAINT "CourseOnUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LessonOnUser_userId_lessonId_key" ON "LessonOnUser"("userId", "lessonId");

-- CreateIndex
CREATE UNIQUE INDEX "CourseOnUser_userId_courseId_key" ON "CourseOnUser"("userId", "courseId");

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonOnUser" ADD CONSTRAINT "LessonOnUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonOnUser" ADD CONSTRAINT "LessonOnUser_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseOnUser" ADD CONSTRAINT "CourseOnUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseOnUser" ADD CONSTRAINT "CourseOnUser_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
