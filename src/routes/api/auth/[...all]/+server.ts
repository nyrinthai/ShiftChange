import { auth } from "$lib/auth";

export const GET = async (event) => {
    return await auth.handler(event.request);
};

export const POST = async (event) => {
    return await auth.handler(event.request);
};