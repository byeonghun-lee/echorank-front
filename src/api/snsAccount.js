import client from "./client";

export const upsert = ({ instagramPath, youtubePath }) =>
    client.post("/sns-accounts", { instagramPath, youtubePath });
