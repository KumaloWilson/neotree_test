// src/app/storage.ts
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => ({
    getItem: () => Promise.resolve(null),
    setItem: <T>(value: T) => Promise.resolve(value),
    removeItem: () => Promise.resolve(),
});

export const storage =
    typeof window !== "undefined"
        ? createWebStorage("local")
        : createNoopStorage();
