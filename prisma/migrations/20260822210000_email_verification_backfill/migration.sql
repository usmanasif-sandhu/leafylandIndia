-- Mark existing accounts as verified so they are not locked out after email verification rollout
UPDATE "User" SET "emailVerified" = "createdAt" WHERE "emailVerified" IS NULL;
