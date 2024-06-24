"use client";

import { useAuthContext } from "@/contexts/authContext";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useRef, useState } from "react";

type Props = {
  children: ReactNode;
};
const AuthRedirect: React.FC<Props> = (props) => {
  const { children } = props;
  const router = useRouter();
  const { user } = useAuthContext();
  const ignore = useRef(false);
  const [checked, setChecked] = useState(false);

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

    if (user !== null) {
      router.push("/user");
      return;
    }

    setChecked(true);
  }, [user, router]);

  if (!checked) {
    return null;
  }

  return children;
};

export default AuthRedirect;
