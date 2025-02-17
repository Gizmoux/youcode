import Link from "next/link";

const AdminPage = () => {
  return (
    <div>
      <h1>Admin</h1>
      <Link href="admin/newCourse">New Course</Link>
    </div>
  );
};

export default AdminPage;
