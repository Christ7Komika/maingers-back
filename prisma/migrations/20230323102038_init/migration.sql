-- CreateTable
CREATE TABLE "Operator" (
    "id" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "operatorSocketId" TEXT,
    "post" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Operator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "clientSocketId" TEXT,
    "ip" TEXT,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InstantMessage" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "operatorId" TEXT,
    "message" TEXT NOT NULL,
    "isClient" BOOLEAN NOT NULL DEFAULT true,
    "isNew" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InstantMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Career" (
    "id" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "photoPath" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "civility" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "cv" TEXT NOT NULL,
    "new" BOOLEAN NOT NULL DEFAULT true,
    "view" BOOLEAN NOT NULL DEFAULT true,
    "cvPath" TEXT NOT NULL,
    "motivationLetter" TEXT NOT NULL,
    "motivationLetterPath" TEXT NOT NULL,
    "targetPosition" TEXT NOT NULL,
    "contractType" TEXT NOT NULL,
    "jobSearch" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Career_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "file" TEXT,
    "filePath" TEXT,
    "new" BOOLEAN NOT NULL DEFAULT true,
    "view" BOOLEAN NOT NULL DEFAULT true,
    "object" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Estimate" (
    "id" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "society" TEXT NOT NULL,
    "codePostal" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "new" BOOLEAN NOT NULL DEFAULT true,
    "view" BOOLEAN NOT NULL DEFAULT true,
    "country" TEXT NOT NULL,
    "estimateType" TEXT NOT NULL,
    "file" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "infos" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Estimate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "society" TEXT NOT NULL,
    "codePostal" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "new" BOOLEAN NOT NULL DEFAULT true,
    "view" BOOLEAN NOT NULL DEFAULT true,
    "func" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NewsLetter" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "new" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NewsLetter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Operator_email_key" ON "Operator"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Operator_operatorSocketId_key" ON "Operator"("operatorSocketId");

-- CreateIndex
CREATE UNIQUE INDEX "Client_clientSocketId_key" ON "Client"("clientSocketId");

-- CreateIndex
CREATE UNIQUE INDEX "NewsLetter_email_key" ON "NewsLetter"("email");

-- AddForeignKey
ALTER TABLE "InstantMessage" ADD CONSTRAINT "InstantMessage_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("clientSocketId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstantMessage" ADD CONSTRAINT "InstantMessage_operatorId_fkey" FOREIGN KEY ("operatorId") REFERENCES "Operator"("operatorSocketId") ON DELETE SET NULL ON UPDATE CASCADE;
