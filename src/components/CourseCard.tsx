import { Edit, Trash2, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/Button';
import type { Course } from '../types/course';
import { formatDateShort } from '../lib/utils/dateFormatter';

interface CourseCardProps {
  course: Course;
  onEdit: (course: Course) => void;
  onDelete: (course: Course) => void;
}

export const CourseCard = ({ course, onEdit, onDelete }: CourseCardProps) => {
  const navigate = useNavigate();
  
  const getInstructorName = (instructor: Course['instructor_id']) => {
    if (typeof instructor === 'string') return instructor;
    return instructor?.username || 'N/A';
  };

  const handleViewDetails = () => {
    navigate(`/courses/${course._id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Thumbnail */}
      <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 relative">
        {course.thumbnail ? (
          <img
            src={course.thumbnail}
            alt={course.name}
            draggable={false}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white text-4xl font-bold">
            {course.name.charAt(0).toUpperCase()}
          </div>
        )}
        
        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
              course.is_published
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {course.is_published ? 'Published' : 'Draft'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-1">
          {course.name}
        </h3>
        
        {course.description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {course.description}
          </p>
        )}

        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Category:</span>
            <span className="font-medium text-gray-900">{course.category}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Level:</span>
            <span className="font-medium text-gray-900">{course.level}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Instructor:</span>
            <span className="font-medium text-gray-900 truncate ml-2">
              {getInstructorName(course.instructor_id)}
            </span>
          </div>
          
          {course.createdAt && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Created:</span>
              <span className="font-medium text-gray-900">{formatDateShort(course.createdAt)}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <Button
            size="sm"
            variant="ghost"
            onClick={handleViewDetails}
            title="View details"
          >
            <Eye className="h-4 w-4 mr-1" />
            View
          </Button>
          
          <div className="flex space-x-1">
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
              onClick={() => onDelete(course)}
              title="Delete course"
            >
              <Trash2 className="h-4 w-4 text-red-600" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
