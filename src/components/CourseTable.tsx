import { Edit, Trash2, Eye } from "lucide-react";
import { Button } from "./ui/button";
import type { Course } from "../types/course";

interface CourseTableProps {
  courses: Course[];
  onEdit: (course: Course) => void;
  onDelete: (id: string) => void;
  onView: (course: Course) => void;
}

export const CourseTable = ({
  courses,
  onEdit,
  onDelete,
  onView,
}: CourseTableProps) => {
  const getInstructorName = (instructor: Course["instructor_id"]) => {
    if (typeof instructor === "string") return instructor;
    return instructor?.username || "N/A";
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b bg-slate-50">
            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">
              Name
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">
              Category
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">
              Level
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">
              Instructor
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">
              Status
            </th>
            <th className="px-4 py-3 text-right text-sm font-semibold text-slate-900">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {courses.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                No courses found. Create your first course to get started.
              </td>
            </tr>
          ) : (
            courses.map((course) => (
              <tr key={course._id} className="border-b hover:bg-slate-50">
                <td className="px-4 py-3 text-sm font-medium text-slate-900">
                  {course.name}
                </td>
                <td className="px-4 py-3 text-sm text-slate-600">
                  {course.category}
                </td>
                <td className="px-4 py-3 text-sm text-slate-600">
                  {course.level}
                </td>
                <td className="px-4 py-3 text-sm text-slate-600">
                  {getInstructorName(course.instructor_id)}
                </td>
                <td className="px-4 py-3 text-sm">
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                      course.is_published
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {course.is_published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onView(course)}
                      title="View details"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onEdit(course)}
                      title="Edit course"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onDelete(course._id)}
                      title="Delete course"
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
