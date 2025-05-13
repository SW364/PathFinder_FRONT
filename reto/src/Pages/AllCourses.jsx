import React from 'react'
import Header from '../components/Header'


export const AllCourses=()=> {
  return (
    <div>
      <Header title="Our Courses" subtitle="Explore our wide range of courses" />
      <div className="container mt-4">
        <h2>Available Courses</h2>
        {/* Add your course listing here */}
      </div>
    </div>
  )
}
