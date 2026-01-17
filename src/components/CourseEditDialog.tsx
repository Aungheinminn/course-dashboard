import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { CourseForm } from './CourseForm';
import { useUpdateCourse } from '../hooks/useCourses';
import type { Course, CreateCourseDto, UpdateCourseDto } from '../types/course';

interface CourseEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  course: Course | null;
  onSuccess?: () => void;
}

export const CourseEditDialog = ({ open, onOpenChange, course, onSuccess }: CourseEditDialogProps) => {
  const updateMutation = useUpdateCourse();

  const handleUpdate = async (data: CreateCourseDto | UpdateCourseDto) => {
    if (!course) return;
    try {
      await updateMutation.mutateAsync({ id: course._id, course: data as UpdateCourseDto });
      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      console.error('Failed to update course:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
         <DialogHeader>
           <DialogTitle>Edit Course</DialogTitle>
         </DialogHeader>
        {course && (
          <CourseForm
            course={course}
            onSubmit={handleUpdate}
            onCancel={() => onOpenChange(false)}
            isLoading={updateMutation.isPending}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
