import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Edit, Trash2, FileText, Loader2 } from "lucide-react";
import { Button } from "../components/ui/Button";
import { ConfirmDialog } from "../components/ui/ConfirmDialog";
import { LessonEditDialog } from "../components/LessonEditDialog";
import { useLesson, useDeleteLesson } from "../hooks/useLessons";

export const LessonDetailPage = () => {
  const { courseId, moduleId, lessonId } = useParams<{
    courseId: string;
    moduleId: string;
    lessonId: string;
  }>();
  const navigate = useNavigate();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { data: lesson, isLoading, error } = useLesson(lessonId || "");
  const deleteMutation = useDeleteLesson();

  const handleDelete = async () => {
    if (!lesson) return;
    try {
      await deleteMutation.mutateAsync(lesson._id);
      setIsDeleteOpen(false);
      navigate(`/courses/${courseId}/modules/${moduleId}/lessons`);
    } catch (error) {
      console.error("Failed to delete lesson:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">
            Lesson Not Found
          </h2>
          <p className="text-slate-600 mb-4">
            {error instanceof Error
              ? error.message
              : "The lesson you are looking for does not exist."}
          </p>
          <Button
            onClick={() =>
              navigate(`/courses/${courseId}/modules/${moduleId}/lessons`)
            }
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Lessons
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link
            to={`/courses/${courseId}/modules/${moduleId}/lessons`}
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Lessons
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <span className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 text-slate-600 text-lg font-semibold">
                    {lesson.order}
                  </span>
                  <h1 className="text-4xl font-bold text-slate-900">
                    {lesson.name}
                  </h1>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() =>
                    navigate(
                      `/courses/${courseId}/modules/${moduleId}/lessons/${lesson._id}/content`,
                    )
                  }
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Edit Content
                </Button>
                <Button variant="outline" onClick={() => setIsEditOpen(true)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Details
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => setIsDeleteOpen(true)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">
                Lesson Information
              </h2>
              <dl className="grid grid-cols-1 gap-4">
                <div className="flex justify-between py-3 border-b border-slate-100">
                  <dt className="text-slate-600">Lesson ID</dt>
                  <dd className="text-slate-900 font-mono text-sm">
                    {lesson._id}
                  </dd>
                </div>
                <div className="flex justify-between py-3 border-b border-slate-100">
                  <dt className="text-slate-600">Order</dt>
                  <dd className="text-slate-900">{lesson.order}</dd>
                </div>
                {lesson.createdAt && (
                  <div className="flex justify-between py-3 border-b border-slate-100">
                    <dt className="text-slate-600">Created</dt>
                    <dd className="text-slate-900">
                      {new Date(lesson.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </dd>
                  </div>
                )}
                {lesson.updatedAt && (
                  <div className="flex justify-between py-3 border-b border-slate-100">
                    <dt className="text-slate-600">Last Updated</dt>
                    <dd className="text-slate-900">
                      {new Date(lesson.updatedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>
      </div>

      <LessonEditDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        lesson={lesson}
        moduleId={moduleId || ""}
        courseId={courseId || ""}
        onSuccess={() => {
          setIsEditOpen(false);
        }}
      />

      <ConfirmDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={handleDelete}
        title="Delete Lesson"
        warningText="This will permanently delete the lesson"
        description={`Are you sure you want to delete "${lesson?.name}"?`}
        footerText="This action cannot be undone."
        confirmText="Delete Lesson"
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
};
