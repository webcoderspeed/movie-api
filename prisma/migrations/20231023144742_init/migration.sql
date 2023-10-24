/*
  Warnings:

  - You are about to drop the column `userId` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `UserSession` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Movie" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "movieName" TEXT NOT NULL,
    "rating" REAL NOT NULL,
    "genre" TEXT NOT NULL,
    "releaseDate" DATETIME NOT NULL
);
INSERT INTO "new_Movie" ("genre", "id", "movieName", "rating", "releaseDate") SELECT "genre", "id", "movieName", "rating", "releaseDate" FROM "Movie";
DROP TABLE "Movie";
ALTER TABLE "new_Movie" RENAME TO "Movie";
CREATE TABLE "new_UserSession" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "accessTokenExpiresAt" DATETIME NOT NULL,
    "refreshTokenExpiresAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_UserSession" ("accessToken", "accessTokenExpiresAt", "createdAt", "id", "refreshToken", "refreshTokenExpiresAt") SELECT "accessToken", "accessTokenExpiresAt", "createdAt", "id", "refreshToken", "refreshTokenExpiresAt" FROM "UserSession";
DROP TABLE "UserSession";
ALTER TABLE "new_UserSession" RENAME TO "UserSession";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
