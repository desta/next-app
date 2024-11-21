"use server"
import { signIn, signOut } from "@/auth";
import { revalidatePath } from "next/cache";

export const login = async (provider) => {
  await signIn(provider, { redirectTo: "/dashboard" });
  revalidatePath("/dashboard");
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
  revalidatePath("/");
};
