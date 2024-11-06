"use client";
import React, { useEffect } from "react";
import * as SignIn from "@clerk/elements/sign-in";
import * as Clerk from "@clerk/elements/common";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
const SignInPage = () => {
  const { isLoaded, user, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    const role = user?.publicMetadata.role;
    if (role) {
      router.push(`/${role}`);
    }
  }, [user, router]);
  return (
    <div className="w-full h-screen flex justify-center items-center bg-lamaSkyLight">
      <SignIn.Root>
        <SignIn.Step
          name="start"
          className="bg-white p-16 rounded-md shadow-2xl flex items-center justify-center flex-col gap-4"
        >
          <h1 className="text-2xl font-semibold">
            <Image
              src={"/logo.png"}
              alt=""
              width={40}
              height={40}
              className="rounded-full"
            />
          </h1>
          <h2>Sign in to your account</h2>
          <Clerk.GlobalError className="text-sm text-red-400" />
          <Clerk.Field name={"identifier"} className="flex flex-col gap-2">
            <Clerk.Label className="text-xs text-gray-500">
              Username
            </Clerk.Label>
            <Clerk.Input
              type="text"
              required
              className="p-2 rounded-md ring-1 ring-gray-300"
            />
            <Clerk.FieldError className="text-xs text-red-400" />
          </Clerk.Field>
          <Clerk.Field className="flex flex-col gap-2" name={"password"}>
            <Clerk.Label className="text-xs text-gray-500">
              Password
            </Clerk.Label>
            <Clerk.Input
              type="password"
              required
              className="p-2 rounded-md ring-1 ring-gray-300"
            />
            <Clerk.FieldError className="text-xs text-red-400" />
          </Clerk.Field>
          <SignIn.Action
            className="bg-blue-500 w-full text-white my-1 p-[10px] rounded-md"
            submit
          >
            Sign in
          </SignIn.Action>
        </SignIn.Step>
      </SignIn.Root>
    </div>
  );
};

export default SignInPage;
