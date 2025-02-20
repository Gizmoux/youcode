/* eslint-disable @next/next/no-img-element */
// app/admin/courses/page.tsx
import { prisma } from "@/lib/prisma"; // Assurez-vous que Prisma est bien initialisé
import { getRequiredAuthSession } from "@/lib/auth"; // Importer la fonction de récupération de session
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
export default async function CoursesPage() {
  // Récupérer la session de l'utilisateur
  const session = await getRequiredAuthSession(); // Récupérer la session avec l'ID de l'utilisateur connecté

  // Récupérer les cours associés à l'utilisateur connecté
  const courses = await prisma.course.findMany({
    where: {
      creatorId: session.user.id, // Filtrer les cours par l'ID de l'utilisateur connecté
    },
  });

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Courses Page</h1>
      <Table>
        <TableCaption>A list of your courses with images.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Image</TableHead>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course.id}>
              <TableCell>
                <img
                  src={course.image}
                  alt={course.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
              </TableCell>
              <TableCell>
                <Link
                  href={`/admin/courses/${course.id}`}
                  className="text-blue-500 hover:underline"
                >
                  {course.name}
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
