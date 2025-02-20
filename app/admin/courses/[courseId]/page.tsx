/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getRequiredAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation"; // Importer redirect depuis next/navigation

const CoursePage = async ({
  params,
}: {
  params: Promise<{ courseId: string; userId: string }>;
}) => {
  const { courseId } = await params; // Récupérer le `courseId` depuis la route dynamique
  const session = await getRequiredAuthSession();
  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
    select: {
      id: true,
      image: true,
      name: true,
      presentation: true,
      state: true,

      users: {
        select: {
          canceledAt: true,
          user: {
            select: {
              email: true,
              id: true,
              image: true,
              name: true,
            },
          },
        },
      },
      lessons: {
        where: {
          state: {
            in: ["PUBLIC", "PUBLISHED"],
          },
        },
        orderBy: {
          rank: "asc",
        },
        select: {
          name: true,
          id: true,
          courseId: true,
          state: true,
        },
      },
      creator: {
        select: {
          name: true,
          image: true,
        },
      },
      _count: {
        select: {
          lessons: true,
          users: true,
        },
      },
    },
  });
  // const users = courses?.users.map((user) => {
  //   return {
  //     canceled: user.canceledAt ? true : false,
  //     ...user.user,
  //   };
  // });

  // Si `courseId` est manquant, tu peux rediriger vers la liste des cours
  if (!courseId) {
    redirect("/admin/courses"); // Rediriger vers la liste des cours si `courseId` est manquant
  }

  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-bold mb-6">{course?.name}</h1>

      <Card className="mt-6">
        <CardHeader>Users</CardHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {course?.users.map((user) => (
              <TableRow key={user.user.id}>
                <TableCell>
                  <img
                    src={user.user.image || "/default-avatar.png"} // Utiliser une image par défaut si l'utilisateur n'a pas d'image
                    alt="alt image"
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </TableCell>
                <TableCell>
                  <Link
                    href={`/admin/courses/${course.id}/user/${user.user.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    {user.user.name}
                  </Link>
                </TableCell>
                <TableCell>{user.canceledAt ? "Canceled" : "Active"}</TableCell>
                <TableCell>
                  <Button>View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <img src={course?.image} alt="image cours" width={32} height={32} />
          <CardTitle>{course?.name}</CardTitle>
          <CardDescription>{course?.state}</CardDescription>
        </CardHeader>
        <CardContent>{course?._count?.users} users enrolled</CardContent>
        <CardContent>{course?._count.lessons} lessons</CardContent>
        <CardFooter className="flex flex-col">
          <Button>Edit Course</Button>
          <Button>Edit Lessons</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CoursePage;
