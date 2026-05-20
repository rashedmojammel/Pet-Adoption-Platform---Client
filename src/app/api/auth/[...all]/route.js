import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

// console.log("AUTH OBJECT:", auth); // ✅ add this

export const { POST, GET } = toNextJsHandler(auth);