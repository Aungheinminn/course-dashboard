import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Plus, Loader2 } from "lucide-react";
import { Button } from "../components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "../components/ui/Dialog";
import { ConfirmDialog } from "../components/ui/ConfirmDialog";
import { LessonForm } from "../components/LessonForm";
import { LessonEditDialog } from "../components/LessonEditDialog";
import { LessonList } from "../components/LessonList";
import { useModule } from "../hooks/useModules";
import {
  useLessonsByModule,
  useCreateLesson,
  useDeleteLesson,
} from "../hooks/useLessons";
import type { Lesson, CreateLessonDto, UpdateLessonDto } from "../types/lesson";

export const ModuleLessonsPage = () => {
  const { courseId, moduleId } = useParams<{
    courseId: string;
    moduleId: string;
  }>();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  const { data: module } = useModule(moduleId || "");
  const {
    data: lessons = [],
    isLoading,
    error,
  } = useLessonsByModule(moduleId || "");
  const createMutation = useCreateLesson();
  const deleteMutation = useDeleteLesson();

  console.log("lessons", lessons);
  const handleCreate = async (data: CreateLessonDto | UpdateLessonDto) => {
    try {
      await createMutation.mutateAsync(data as CreateLessonDto);
      setIsCreateOpen(false);
    } catch (error) {
      console.error("Failed to create lesson:", error);
    }
  };

  const handleEdit = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setIsEditOpen(true);
  };

  const handleEditSuccess = () => {
    setSelectedLesson(null);
  };

  const handleDeleteClick = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setIsDeleteOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedLesson) return;
    try {
      await deleteMutation.mutateAsync(selectedLesson._id);
      setIsDeleteOpen(false);
      setSelectedLesson(null);
    } catch (error) {
      console.error("Failed to delete lesson:", error);
    }
  };

  return (
    <div className="h-full">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link
            to={`/courses/${courseId}/modules`}
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Modules
          </Link>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl font-bold text-slate-900">
                {module?.name || "Module"} - Lessons
              </h1>
              <p className="mt-2 text-slate-600">
                Manage lessons for this module
              </p>
            </div>
            <Button
              className="flex-shrink-0"
              onClick={() => setIsCreateOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Lesson
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600">Failed to load lessons</p>
            </div>
          ) : (
            <LessonList
              courseId={courseId || ""}
              moduleId={moduleId || ""}
              lessons={lessons}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
            />
          )}
        </div>
      </div>

      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Lesson</DialogTitle>
            <DialogClose onClick={() => setIsCreateOpen(false)} />
          </DialogHeader>
          <LessonForm
            moduleId={moduleId || ""}
            courseId={courseId || ""}
            onSubmit={handleCreate}
            onCancel={() => setIsCreateOpen(false)}
            isLoading={createMutation.isPending}
          />
        </DialogContent>
      </Dialog>

      <LessonEditDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        lesson={selectedLesson}
        moduleId={moduleId || ""}
        courseId={courseId || ""}
        onSuccess={handleEditSuccess}
      />

      <ConfirmDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={handleDelete}
        title="Delete Lesson"
        warningText="This will permanently delete the lesson"
        description={`Are you sure you want to delete "${selectedLesson?.name}"?`}
        footerText="This action cannot be undone."
        confirmText="Delete Lesson"
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
};
