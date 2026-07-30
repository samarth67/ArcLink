export const PROJECT_ID =
  process.env.NEXT_PUBLIC_REOWN_PROJECT_ID || "";

if (!PROJECT_ID) {
  throw new Error("Reown Project ID is missing.");
}