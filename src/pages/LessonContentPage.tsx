import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { Button } from "../components/ui/Button";
import { useLesson, useUpdateLesson } from "../hooks/useLessons";
import { MarkdownEditor } from "../components/MarkdownEditor";

export const LessonContentPage = () => {
  const { courseId, moduleId, lessonId } = useParams<{
    courseId: string;
    moduleId: string;
    lessonId: string;
  }>();
  const navigate = useNavigate();

  const { data: lesson, isLoading, error } = useLesson(lessonId || "");
  const updateMutation = useUpdateLesson();

  const [content, setContent] = useState(lesson?.content || "");
  const [hasChanges, setHasChanges] = useState(false);

  const handleSave = async () => {
    if (!lesson) return;
    const updatedLesson = { content: content };
    try {
      await updateMutation.mutateAsync({
        id: lesson._id,
        lesson: updatedLesson,
      });
      setHasChanges(false);
    } catch (error) {
      console.error("Failed to update lesson:", error);
    }
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    setHasChanges(newContent !== lesson?.content);
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to={`/courses/${courseId}/modules/${moduleId}/lessons/${lessonId}`}
                className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900"
              >
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  {lesson.name}
                </h1>
                <p className="text-sm text-slate-600">Edit Content</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                onClick={handleSave}
                disabled={!hasChanges || updateMutation.isPending}
              >
                <Save className="h-4 w-4 mr-2" />
                {updateMutation.isPending ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="w-full h-full">
            <MarkdownEditor
              content={lesson.content || ""}
              onChange={handleContentChange}
            />
          </div>
        </div>

        {hasChanges && (
          <div className="fixed bottom-2 right-6 bg-slate-900 text-white px-4 py-2 rounded-lg shadow-lg text-sm">
            Unsaved changes
          </div>
        )}
      </div>
    </div>
  );
};
