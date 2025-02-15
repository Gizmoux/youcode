import { Button } from "@/components/ui/button";
import React from "react";

const CoursesPage = () => {
  return (
    <div>
      <h1>Courses</h1>
      <Button>New Course</Button>

      <h2>Image</h2>
      <div>
        <h2>Name</h2>
        <ul>
          <li>BeginJavascript</li>
          <li>BeginReact</li>
          <li>BeginPython</li>
          <li>BeginDjango</li>
        </ul>
      </div>
    </div>
  );
};

export default CoursesPage;
