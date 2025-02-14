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

  return (
    <>
      <Card className="w-full">
        {session?.user ? (
          <CardHeader>
            <CardTitle className="bg-red-200 w-1/2 rounded">
              {session?.user?.image && (
                <Image
                  src={session.user.image}
                  alt="user image"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              )}
              <h1>{session.user.email && <span>{session.user.email}</span>}</h1>
              <p className="text-sm italic">
                {session.user.name && <span>{session.user.name}</span>}
              </p>
            </CardTitle>
            <CardFooter className="flex justify-between">
              <Link
                className={buttonVariants({ variant: "outline", size: "lg" })}
                href="/account/settings"
              >
                Settings
              </Link>
              <Link
                className={buttonVariants({ variant: "outline", size: "lg" })}
                href="/admin"
              >
                Admin
              </Link>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  {/* <Button onClick={signOut} variant="outline">Logouuuuut</Button> */}
                  {/* <button className="bg-red-400 rounded p-3 m-3 w-20" onClick={signOut()}>Logout</button> */}
                  <Button variant="destructive">
                    <LogOut />
                    Logout
                  </Button>
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
            </CardFooter>
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
