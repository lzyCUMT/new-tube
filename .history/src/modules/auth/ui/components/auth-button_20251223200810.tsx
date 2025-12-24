"use client";

import { Button } from "@/components/ui/button";
import { UserCircleIcon } from "lucide-react";
import { UserButton, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";

export const AuthButton = () => {
  return (
    // TODO: Add diffferent auth states
    <Button
      variant="outline"
      className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-500 border-blue-500/20
      rounded-full shadow-none"
    >
      <UserCircleIcon />
      Sign in
    </Button>
  );
};
