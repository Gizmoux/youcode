"use client";
import { signIn } from "next-auth/react";

const Login = () => {
  return (
    <div  >
      <button className="bg-red-400 rounded m-4 p-3" onClick={() => signIn("github", { redirectTo: "/account" })}>
        Sign In with Github
      </button>
    </div>
  );
};

export default Login;
