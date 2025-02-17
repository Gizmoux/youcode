import Link from "next/link";

const CoursesPage = () => {
  const courses = [
    { id: "1", name: "BeginJavascript" },
    { id: "2", name: "BeginReact" },
    { id: "3", name: "BeginPython" },
    { id: "4", name: "BeginDjango" },
  ];

  return (
    <div>
      <h1>Courses Page</h1>
      <Link href="/admin/courses">Back to Courses</Link>
      <button>New Courseeee</button>

      <h2>Image</h2>
      <div>
        <h2>Name</h2>
        <ul>
          {courses.map((course) => (
            <li key={course.id}>
              {/* Lien vers la page dynamique de chaque cours */}
              <Link href={`/admin/courses/${course.id}`}>{course.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CoursesPage;
