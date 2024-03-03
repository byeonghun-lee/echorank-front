import client from "./client";

export const create = (name) => client.post("/groups", { name });

export const getList = () => client.get("/groups");

export const addGroup = ({ groupId, followIds }) =>
    client.patch(`/groups/${groupId}/follows`, { followIds });

export const getItemList = (groupId) => client.get(`/groups/${groupId}`);
