"use client";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
// import {useMutation} from "@tanstack/react-query"

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Loader, LogOut } from "lucide-react";

export default function AccountPage() {
  const { data: session } = useSession();
  // if (!session) {
  //   throw new Error("No session found!!");
  // }
  return (
    <>
      <Card className="m-auto max-w-lg mt-4 p-4">
        {session?.user ? (
          <CardHeader className="flex flex-row m-4">
            {session?.user?.image && (
              <Image
                src={session.user.image}
                alt="user image"
                width={32}
                height={32}
                className="rounded m-8"
              />
            )}

            <div className="flex flex-col gap-1">
              <CardTitle>{session.user.email}</CardTitle>
              <CardDescription>{session.user.name}</CardDescription>
            </div>
            <CardContent className="flex flex-col gap-2">
              <Link
                className={buttonVariants({ variant: "outline", size: "lg" })}
                href="/account"
              >
                Settings
              </Link>
              <Link
                className={buttonVariants({ variant: "outline", size: "lg" })}
                href="/admin/courses"
              >
                Admin
              </Link>
            </CardContent>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <CardFooter className="flex flex-row-reverse">
                  <Button variant="destructive">
                    <LogOut />
                    Logout
                  </Button>
                </CardFooter>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you absolutely sure to logout?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => signOut()}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardHeader>
        ) : (
          <Link href="/login">
            <LogOut />
            Connexion
          </Link>
        )}
      </Card>
    </>
  );
}
