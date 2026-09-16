-- CreateEnum
CREATE TYPE "PropertyPurpose" AS ENUM ('venda', 'aluguel');

-- CreateEnum
CREATE TYPE "RentalModality" AS ENUM ('longa-temporada', 'curta-temporada');

-- CreateEnum
CREATE TYPE "PropertyType" AS ENUM ('apartamento', 'cobertura', 'flat', 'casa', 'terreno');

-- CreateEnum
CREATE TYPE "PropertyStatus" AS ENUM ('rascunho', 'publicado', 'arquivado');

-- CreateEnum
CREATE TYPE "PropertyMediaType" AS ENUM ('imagem', 'video', 'planta');

-- CreateEnum
CREATE TYPE "LeadType" AS ENUM ('general', 'buy', 'rent', 'investment', 'valuation');

-- CreateEnum
CREATE TYPE "LeadSourcePage" AS ENUM ('contact', 'property-details', 'buy', 'rent', 'long-term-rent', 'short-term-rent', 'investment');

-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('novo', 'contatado', 'qualificado', 'negociacao', 'ganho', 'perdido');

-- CreateEnum
CREATE TYPE "AttributionTouchType" AS ENUM ('first', 'last');

-- CreateEnum
CREATE TYPE "FollowUpStatus" AS ENUM ('pendente', 'concluido', 'cancelado');

-- CreateTable
CREATE TABLE "Region" (
    "id" TEXT NOT NULL,
    "slug" VARCHAR(120) NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "city" VARCHAR(120) NOT NULL,
    "state" VARCHAR(2) NOT NULL DEFAULT 'CE',
    "description" TEXT,
    "highlight" VARCHAR(180),
    "seoPath" VARCHAR(200),
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Region_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Property" (
    "id" TEXT NOT NULL,
    "code" VARCHAR(60) NOT NULL,
    "slug" VARCHAR(180) NOT NULL,
    "title" VARCHAR(240) NOT NULL,
    "description" TEXT,
    "purpose" "PropertyPurpose" NOT NULL,
    "rentalModality" "RentalModality",
    "type" "PropertyType" NOT NULL,
    "status" "PropertyStatus" NOT NULL DEFAULT 'rascunho',
    "investmentOpportunity" BOOLEAN NOT NULL DEFAULT false,
    "salePrice" DECIMAL(14,2),
    "monthlyRent" DECIMAL(14,2),
    "dailyRate" DECIMAL(12,2),
    "cleaningFee" DECIMAL(12,2),
    "priceLabel" VARCHAR(120),
    "bedrooms" INTEGER,
    "bathrooms" INTEGER,
    "parkingSpaces" INTEGER,
    "area" DECIMAL(12,2),
    "maxGuests" INTEGER,
    "minimumStay" INTEGER,
    "checkInTime" VARCHAR(10),
    "checkOutTime" VARCHAR(10),
    "address" VARCHAR(300),
    "features" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "detailsSections" JSONB,
    "imageDisclaimer" TEXT,
    "contactHeading" VARCHAR(180),
    "contactDescription" TEXT,
    "contactCta" VARCHAR(180),
    "contactMessage" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "demonstrative" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMPTZ(3),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "regionId" TEXT,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropertyMedia" (
    "id" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "type" "PropertyMediaType" NOT NULL DEFAULT 'imagem',
    "url" VARCHAR(500) NOT NULL,
    "alt" VARCHAR(300),
    "position" INTEGER NOT NULL DEFAULT 0,
    "isCover" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PropertyMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "phone" VARCHAR(30) NOT NULL,
    "phoneNormalized" VARCHAR(20),
    "email" VARCHAR(254),
    "emailNormalized" VARCHAR(254),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "submissionId" UUID NOT NULL,
    "type" "LeadType" NOT NULL,
    "sourcePage" "LeadSourcePage" NOT NULL,
    "status" "LeadStatus" NOT NULL DEFAULT 'novo',
    "message" TEXT,
    "privacyNoticeAcknowledged" BOOLEAN NOT NULL,
    "privacyNoticeVersion" VARCHAR(50) NOT NULL,
    "privacyAcknowledgedAt" TIMESTAMPTZ(3) NOT NULL,
    "propertySlugSnapshot" VARCHAR(180),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "contactId" TEXT NOT NULL,
    "propertyId" TEXT,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeadAttribution" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "touchType" "AttributionTouchType" NOT NULL,
    "capturedAt" TIMESTAMPTZ(3) NOT NULL,
    "landingPath" VARCHAR(500) NOT NULL,
    "referrerHost" VARCHAR(255),
    "utmSource" VARCHAR(255),
    "utmMedium" VARCHAR(255),
    "utmCampaign" VARCHAR(255),
    "utmContent" VARCHAR(255),
    "utmTerm" VARCHAR(255),

    CONSTRAINT "LeadAttribution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FollowUpTask" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "action" VARCHAR(240) NOT NULL,
    "notes" TEXT,
    "status" "FollowUpStatus" NOT NULL DEFAULT 'pendente',
    "dueAt" TIMESTAMPTZ(3),
    "completedAt" TIMESTAMPTZ(3),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "FollowUpTask_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Region_slug_key" ON "Region"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Region_seoPath_key" ON "Region"("seoPath");

-- CreateIndex
CREATE INDEX "Region_city_active_idx" ON "Region"("city", "active");

-- CreateIndex
CREATE UNIQUE INDEX "Property_code_key" ON "Property"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Property_slug_key" ON "Property"("slug");

-- CreateIndex
CREATE INDEX "Property_status_idx" ON "Property"("status");

-- CreateIndex
CREATE INDEX "Property_purpose_status_idx" ON "Property"("purpose", "status");

-- CreateIndex
CREATE INDEX "Property_type_status_idx" ON "Property"("type", "status");

-- CreateIndex
CREATE INDEX "Property_regionId_status_idx" ON "Property"("regionId", "status");

-- CreateIndex
CREATE INDEX "Property_featured_status_idx" ON "Property"("featured", "status");

-- CreateIndex
CREATE INDEX "PropertyMedia_propertyId_isCover_idx" ON "PropertyMedia"("propertyId", "isCover");

-- CreateIndex
CREATE UNIQUE INDEX "PropertyMedia_propertyId_position_key" ON "PropertyMedia"("propertyId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_phoneNormalized_key" ON "Contact"("phoneNormalized");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_emailNormalized_key" ON "Contact"("emailNormalized");

-- CreateIndex
CREATE UNIQUE INDEX "Lead_submissionId_key" ON "Lead"("submissionId");

-- CreateIndex
CREATE INDEX "Lead_status_createdAt_idx" ON "Lead"("status", "createdAt");

-- CreateIndex
CREATE INDEX "Lead_type_createdAt_idx" ON "Lead"("type", "createdAt");

-- CreateIndex
CREATE INDEX "Lead_sourcePage_createdAt_idx" ON "Lead"("sourcePage", "createdAt");

-- CreateIndex
CREATE INDEX "Lead_contactId_idx" ON "Lead"("contactId");

-- CreateIndex
CREATE INDEX "Lead_propertyId_idx" ON "Lead"("propertyId");

-- CreateIndex
CREATE INDEX "LeadAttribution_utmSource_idx" ON "LeadAttribution"("utmSource");

-- CreateIndex
CREATE INDEX "LeadAttribution_utmCampaign_idx" ON "LeadAttribution"("utmCampaign");

-- CreateIndex
CREATE UNIQUE INDEX "LeadAttribution_leadId_touchType_key" ON "LeadAttribution"("leadId", "touchType");

-- CreateIndex
CREATE INDEX "FollowUpTask_leadId_status_idx" ON "FollowUpTask"("leadId", "status");

-- CreateIndex
CREATE INDEX "FollowUpTask_status_dueAt_idx" ON "FollowUpTask"("status", "dueAt");

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertyMedia" ADD CONSTRAINT "PropertyMedia_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeadAttribution" ADD CONSTRAINT "LeadAttribution_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FollowUpTask" ADD CONSTRAINT "FollowUpTask_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;
