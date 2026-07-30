export const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID || "";

if (!PROJECT_ID) {
  throw new Error("Reown Project ID is missing. Check .env.local file");
}