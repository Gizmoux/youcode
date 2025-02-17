import { redirect } from "next/navigation"; // Importer redirect depuis next/navigation

const CoursePage = async ({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) => {
  const { courseId } = await params; // Récupérer le `courseId` depuis la route dynamique

  // Si `courseId` est manquant, tu peux rediriger vers la liste des cours
  if (!courseId) {
    redirect("/admin/courses"); // Rediriger vers la liste des cours si `courseId` est manquant
  }

  return (
    <div>
      <h1>Course {courseId}</h1>
      <p>Details about the course {courseId}...</p>
    </div>
  );
};

export default CoursePage;
