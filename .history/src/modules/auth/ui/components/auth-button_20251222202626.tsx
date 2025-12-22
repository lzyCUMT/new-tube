import { Button } from "@/components/ui/button";
import { UserCircleIcon } from "lucide-react";

export const AuthButton = () => {
  return (
    <Button
      variant="outline"
      className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-500"
    >
      <UserCircleIcon />
      Sign in
    </Button>
  );
};
