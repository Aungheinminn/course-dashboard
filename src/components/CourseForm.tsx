import { useState } from 'react';
import type { FormEvent } from 'react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import type { Course, CreateCourseDto, UpdateCourseDto } from '../types/course';
import { useAuth } from '../lib/utils/useAuth';

interface CourseFormProps {
  course?: Course;
  onSubmit: (data: CreateCourseDto | UpdateCourseDto) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const CourseForm = ({ course, onSubmit, onCancel, isLoading }: CourseFormProps) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: course?.name || '',
    description: course?.description || '',
    instructor_id: user?._id || '',
    category: course?.category || '',
    level: course?.level || 'Beginner',
    thumbnail: course?.thumbnail || '',
    is_published: course?.is_published ?? false,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Course Name *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          placeholder="Enter course name"
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="flex min-h-[80px] w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Enter course description"
        />
      </div>

      <div>
        <Label htmlFor="category">Category *</Label>
        <Input
          id="category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          required
          placeholder="e.g., Programming, Design, Business"
        />
      </div>

       <div>
         <Label htmlFor="level">Level *</Label>
         <select
           id="level"
           value={formData.level}
           onChange={(e) => setFormData({ ...formData, level: e.target.value })}
           required
           className="flex w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
         >
           <option value="Beginner">Beginner</option>
           <option value="Intermediate">Intermediate</option>
           <option value="Advanced">Advanced</option>
         </select>
       </div>

      <div>
        <Label htmlFor="thumbnail">Thumbnail URL</Label>
        <Input
          id="thumbnail"
          value={formData.thumbnail}
          onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="is_published"
          checked={formData.is_published}
          onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
          className="h-4 w-4 rounded border-slate-300"
        />
        <Label htmlFor="is_published">Published</Label>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : course ? 'Update Course' : 'Create Course'}
        </Button>
      </div>
    </form>
  );
};
