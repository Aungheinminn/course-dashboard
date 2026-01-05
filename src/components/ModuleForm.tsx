import { useState, useEffect } from 'react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Label } from './ui/Label';
import type { Module, CreateModuleDto, UpdateModuleDto } from '../types/module';

interface ModuleFormProps {
  courseId: string;
  module?: Module;
  onSubmit: (data: CreateModuleDto | UpdateModuleDto) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export const ModuleForm = ({ courseId, module, onSubmit, onCancel, isLoading }: ModuleFormProps) => {
  const [formData, setFormData] = useState({
    name: module?.name || '',
    description: module?.description || '',
  });

  useEffect(() => {
    if (module) {
      setFormData({
        name: module.name,
        description: module.description || '',
      });
    }
  }, [module]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = module
      ? formData
      : { ...formData, course_id: courseId };
    await onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Module Name *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 min-h-[100px]"
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : module ? 'Update Module' : 'Create Module'}
        </Button>
      </div>
    </form>
  );
};
