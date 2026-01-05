import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { CourseEditDialog } from '../components/CourseEditDialog';
import { useCourse, useDeleteCourse } from '../hooks/useCourses';
import type { Course } from '../types/course';

export const CourseDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const { data: course, isLoading, error } = useCourse(id!);
  const deleteMutation = useDeleteCourse();

  const handleEdit = () => {
    setIsEditOpen(true);
  };

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(id!);
      setIsDeleteOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Failed to delete course:', error);
    }
  };

  const getInstructorInfo = (instructor: Course['instructor_id']) => {
    if (typeof instructor === 'string') return { name: instructor, email: 'N/A' };
    return { name: instructor?.username || 'N/A', email: instructor?.email || 'N/A' };
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Course Not Found</h2>
          <p className="text-slate-600 mb-4">
            {error instanceof Error ? error.message : 'The course you are looking for does not exist.'}
          </p>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Courses
          </Button>
        </div>
      </div>
    );
  }

  const instructorInfo = getInstructorInfo(course.instructor_id);

  return (
    <div className="h-full">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate('/')} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Courses
          </Button>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Hero Section with Thumbnail */}
          <div className="h-80 bg-gradient-to-br from-blue-500 to-purple-600 relative">
            {course.thumbnail ? (
              <img
                src={course.thumbnail}
                alt={course.name}
                draggable={false}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="text-8xl font-bold mb-4">
                    {course.name.charAt(0).toUpperCase()}
                  </div>
                </div>
              </div>
            )}
            
            {/* Status Badge */}
            <div className="absolute top-6 right-6">
              <span
                className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
                  course.is_published
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {course.is_published ? 'Published' : 'Draft'}
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8">
            {/* Title and Actions */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{course.name}</h1>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className="inline-flex items-center">
                    <span className="font-semibold mr-1">Category:</span>
                    {course.category}
                  </span>
                  <span className="inline-flex items-center">
                    <span className="font-semibold mr-1">Level:</span>
                    {course.level}
                  </span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button onClick={handleEdit}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button variant="destructive" onClick={() => setIsDeleteOpen(true)}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Course
                </Button>
              </div>
            </div>

            {/* Description */}
            {course.description && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Description</h2>
                <p className="text-gray-700 leading-relaxed">{course.description}</p>
              </div>
            )}

            {/* Course Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-slate-50 rounded-lg p-6">
                <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-2">
                  Instructor
                </h3>
                <p className="text-lg font-medium text-gray-900">{instructorInfo.name}</p>
                {instructorInfo.email !== 'N/A' && (
                  <p className="text-sm text-gray-600 mt-1">{instructorInfo.email}</p>
                )}
              </div>

              <div className="bg-slate-50 rounded-lg p-6">
                <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-2">
                  Modules
                </h3>
                <p className="text-lg font-medium text-gray-900">
                  {course.modules?.length || 0} modules
                </p>
              </div>

              {course.createdAt && (
                <div className="bg-slate-50 rounded-lg p-6">
                  <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-2">
                    Created
                  </h3>
                  <p className="text-lg font-medium text-gray-900">
                    {new Date(course.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              )}

              {course.updatedAt && (
                <div className="bg-slate-50 rounded-lg p-6">
                  <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-2">
                    Last Updated
                  </h3>
                  <p className="text-lg font-medium text-gray-900">
                    {new Date(course.updatedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              )}
            </div>

            {/* Additional Info */}
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Course Information</h2>
              <dl className="grid grid-cols-1 gap-4">
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <dt className="text-gray-600">Course ID</dt>
                  <dd className="text-gray-900 font-mono text-sm">{course._id}</dd>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <dt className="text-gray-600">Status</dt>
                  <dd className="text-gray-900">
                    {course.is_published ? 'Published and visible to students' : 'Draft - not visible to students'}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <CourseEditDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        course={course}
      />

      <ConfirmDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={handleDelete}
        title="Delete Course"
        warningText="Delete all modules first or this will fail"
        description={`Are you sure you want to delete "${course?.name}"?`}
        footerText="This action cannot be undone."
        confirmText="Delete Course"
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
};
