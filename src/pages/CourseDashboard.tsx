import { useState } from 'react';
import { Plus, Loader2 } from 'lucide-react';
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { ConfirmDialog } from "../components/ui/confirm-dialog";
import { CourseForm } from '../components/CourseForm';
import { CourseEditDialog } from '../components/CourseEditDialog';
import { CourseGrid } from '../components/CourseGrid';
import { useCoursesByInstructor, useCreateCourse, useDeleteCourse } from '../hooks/useCourses';
import { useAuth } from '../lib/utils/useAuth';
import type { Course, CreateCourseDto, UpdateCourseDto } from '../types/course';

export const CourseDashboard = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  
  const { user } = useAuth();
  const { data: courses = [], isLoading, error } = useCoursesByInstructor(user?._id || '');
  const createMutation = useCreateCourse();
  const deleteMutation = useDeleteCourse();

  const handleCreate = async (data: CreateCourseDto | UpdateCourseDto) => {
    try {
      await createMutation.mutateAsync(data as CreateCourseDto);
      setIsCreateOpen(false);
    } catch (error) {
      console.error('Failed to create course:', error);
    }
  };

  const handleEditSuccess = () => {
    setSelectedCourse(null);
  };

  const handleDeleteClick = (course: Course) => {
    setSelectedCourse(course);
    setIsDeleteOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedCourse) return;
    try {
      await deleteMutation.mutateAsync(selectedCourse._id);
      setIsDeleteOpen(false);
      setSelectedCourse(null);
    } catch (error) {
      console.error('Failed to delete course:', error);
    }
  };

  const handleEdit = (course: Course) => {
    setSelectedCourse(course);
    setIsEditOpen(true);
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Courses</h2>
          <p className="text-slate-600">
            {error instanceof Error ? error.message : 'Failed to load courses'}
          </p>
          <p className="text-sm text-slate-500 mt-2">
            Make sure the backend server is running on {import.meta.env.VITE_API_URL || 'http://localhost:3000'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Course Management</h1>
              <p className="mt-2 text-slate-600">
                Manage your courses, instructors, and content
              </p>
            </div>
            <Button onClick={() => setIsCreateOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Course
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
            </div>
          ) : (
            <CourseGrid
              courses={courses}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
            />
          )}
        </div>
      </div>

      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
         <DialogContent>
           <DialogHeader>
             <DialogTitle>Create New Course</DialogTitle>
           </DialogHeader>
          <CourseForm
            onSubmit={handleCreate}
            onCancel={() => setIsCreateOpen(false)}
            isLoading={createMutation.isPending}
          />
        </DialogContent>
      </Dialog>

      <CourseEditDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        course={selectedCourse}
        onSuccess={handleEditSuccess}
      />

      <ConfirmDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={handleDelete}
        title="Delete Course"
        warningText="Delete all modules first or this will fail"
        description={`Are you sure you want to delete "${selectedCourse?.name}"?`}
        footerText="This action cannot be undone."
        confirmText="Delete Course"
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
};
