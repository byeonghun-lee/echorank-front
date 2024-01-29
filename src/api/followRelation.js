import client from "./client";

export const getList = ({ snsName }) =>
    client.get(`/follow-relations/${snsName}`);
