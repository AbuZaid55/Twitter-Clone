import nextAuth from "next-auth";
import authOptions from "./authOptions";
export const handler = nextAuth(authOptions)