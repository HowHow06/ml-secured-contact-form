"use client";
import { useAuthContext } from "@/components/contexts/AuthContext";
import { useEffect, useState } from "react";

type Props = {};

const UserName = (props: Props) => {
  const { user } = useAuthContext();
  const [name, setName] = useState("user");
  useEffect(() => {
    if (user === undefined || user === null) {
      return;
    }

    if (user.fullname) {
      setName(user.fullname);
    }
  }, [user]);

  return <>{name}</>;
};

export default UserName;
