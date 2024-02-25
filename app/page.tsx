"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data, status } = useSession();
  const router = useRouter();
  const logoutHandler = async () => {
    await signOut();
  };
  const loginHandle = async () => {
    router.push("/api/auth/signin");
  };

  if (status == "authenticated")
    return (
      <>
        <div>{JSON.stringify(data)}</div>
        <button onClick={logoutHandler}>Logout</button>
      </>
    );

  if (status == "loading") return <>Loading...</>;

  return (
    <>
      <button onClick={loginHandle}>Login</button>
    </>
  );
}
