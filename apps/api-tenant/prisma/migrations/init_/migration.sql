-- CreateEnum
CREATE TYPE "BaseState" AS ENUM ('DELETED', 'ACTIVE');

-- CreateEnum
CREATE TYPE "TenantState" AS ENUM ('DEACTIVATE', 'ACTIVE');

-- CreateEnum
CREATE TYPE "TenantStatus" AS ENUM ('NEW', 'VERIFIED', 'CREATED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tenant" (
    "id" TEXT NOT NULL,
    "alias" TEXT,
    "config" JSONB DEFAULT '[]',
    "owner" TEXT,
    "email" TEXT,
    "verificationLink" TEXT,
    "state" "TenantState" NOT NULL DEFAULT 'ACTIVE',
    "baseState" "BaseState" NOT NULL DEFAULT 'ACTIVE',
    "status" "TenantStatus" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "createdById" TEXT,
    "updatedById" TEXT,

    CONSTRAINT "Tenant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Tenant_alias_key" ON "Tenant"("alias");

-- CreateIndex
CREATE UNIQUE INDEX "Tenant_email_key" ON "Tenant"("email");

-- AddForeignKey
ALTER TABLE "Tenant" ADD CONSTRAINT "Tenant_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tenant" ADD CONSTRAINT "Tenant_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
