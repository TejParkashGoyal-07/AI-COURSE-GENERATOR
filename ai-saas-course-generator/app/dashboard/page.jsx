import AddCourse from './_components/AddCourse';
import React from 'react';
import UserCourseList from "./_components/UserCourseList"
function Dashboard() {
  return (
    <div>
      <AddCourse />
      {/* Display List Of Course */}
      <UserCourseList/>
    </div>
  );
}

export default Dashboard;

