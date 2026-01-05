import { FileText } from 'lucide-react';
import type { Module } from '../types/module';
import { ModuleCard } from './ModuleCard';

interface ModuleListProps {
  courseId: string;
  modules: Module[];
  onEdit: (module: Module) => void;
  onDelete: (module: Module) => void;
}

export const ModuleList = ({ courseId, modules, onEdit, onDelete }: ModuleListProps) => {

  if (modules.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="h-12 w-12 text-slate-300 mx-auto mb-4" />
        <p className="text-slate-500">No modules yet. Create your first module to get started.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {modules.map((module) => (
          <ModuleCard key={module._id} module={module} courseId={courseId} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};
