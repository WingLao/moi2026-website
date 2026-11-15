-- CreateTable
CREATE TABLE "public"."WhiteboardVersion" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "problemId" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WhiteboardVersion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "WhiteboardVersion_userId_problemId_createdAt_idx" ON "public"."WhiteboardVersion"("userId", "problemId", "createdAt");

-- CreateIndex
CREATE INDEX "WhiteboardVersion_problemId_idx" ON "public"."WhiteboardVersion"("problemId");

-- AddForeignKey
ALTER TABLE "public"."WhiteboardVersion" ADD CONSTRAINT "WhiteboardVersion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."WhiteboardVersion" ADD CONSTRAINT "WhiteboardVersion_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "public"."Problem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
