import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import type { Lesson, CreateLessonDto, UpdateLessonDto } from "../types/lesson";

interface LessonFormProps {
  moduleId: string;
  courseId: string;
  lesson?: Lesson;
  onSubmit: (data: CreateLessonDto | UpdateLessonDto) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export const LessonForm = ({
  moduleId,
  courseId,
  lesson,
  onSubmit,
  onCancel,
  isLoading,
}: LessonFormProps) => {
  const [formData, setFormData] = useState({
    name: lesson?.name || "",
    content: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = lesson
      ? formData
      : { ...formData, module_id: moduleId, course_id: courseId };
    await onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Lesson Name *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : lesson ? "Update Lesson" : "Create Lesson"}
        </Button>
      </div>
    </form>
  );
};
