"use client";

import { useAuthContext } from "@/contexts/authContext";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useRef, useState } from "react";

type Props = {
  children: ReactNode;
};
const AuthGuard: React.FC<Props> = (props) => {
  const { children } = props;
  const router = useRouter();
  const { user } = useAuthContext();
  const ignore = useRef(false);
  const [checked, setChecked] = useState(false);

  // Only do authentication check on component mount.
  // This flow allows you to manually redirect the user after sign-out, otherwise this will be
  // triggered and will automatically redirect to sign-in page.

  useEffect(() => {
    // not initialized yet
    if (user === undefined) {
      return;
    }

    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (ignore.current) {
      return;
    }

    ignore.current = true;

    // initialized but user not found
    if (user === null) {
      router.push("/login");
      return;
    }

    setChecked(true);
  }, [user, router]);

  if (!checked) {
    return null;
  }

  // If got here, it means that the redirect did not occur, and that tells us that the user is
  // authenticated / authorized.

  return children;
};

export default AuthGuard;
