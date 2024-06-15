-- CreateTable
CREATE TABLE "Guild" (
    "guildId" BIGINT NOT NULL,
    "language" TEXT NOT NULL DEFAULT 'english',
    "commands" TEXT,

    CONSTRAINT "Guild_pkey" PRIMARY KEY ("guildId")
);
