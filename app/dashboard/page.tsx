"use client";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
export default function DashboardPage() {
  const { data: session } = useSession();

  const handleSignOutwithAlert =() => {
    alert("Souhaitez-vous continuer votre Déconnexion? ")
    signOut()
  }

  return (
    <>
      {session?.user ? (
        <div>
          <div>
          {session?.user?.image && (
            <Image
              src={session.user.image}
              alt="user image"
              width={32}
              height={32}
              className="rounded-full"
            />
          )}
          {session.user.email && <span>{session.user.email}</span>}
          {session.user.name && <span>{session.user.name}</span>}
          </div>
          <button className="bg-red-400 rounded p-3 m-3" onClick={handleSignOutwithAlert}>Logout</button>
        </div>
      ) : (
        <Link href="/login">
          <button className="bg-green-400 rounded p-3 m-3">Connexion</button>
        </Link>
      )}
    </>
  );
}
