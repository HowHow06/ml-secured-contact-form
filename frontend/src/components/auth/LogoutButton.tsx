"use client";
import authApi from "@/api/authApi";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/contexts/authContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  className?: string;
};

const LogoutButton = ({ className }: Props) => {
  const router = useRouter();
  const { refreshAuthContext } = useAuthContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onLogoutClick = async () => {
    setIsSubmitting(true);
    try {
      const res = await authApi.logout();

      if (res.ok) {
        router.push("/");
        await refreshAuthContext();
      }
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };

  return (
    <Button
      variant="destructive"
      className={className}
      onClick={onLogoutClick}
      disabled={isSubmitting}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
