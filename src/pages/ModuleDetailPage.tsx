import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, BookOpen } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { ModuleEditDialog } from '../components/ModuleEditDialog';
import { useModule, useDeleteModule } from '../hooks/useModules';

export const ModuleDetailPage = () => {
  const { courseId, moduleId } = useParams<{ courseId: string; moduleId: string }>();
  const navigate = useNavigate();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const { data: module, isLoading } = useModule(moduleId || '');
  const deleteMutation = useDeleteModule();

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(moduleId!);
      setIsDeleteOpen(false);
      navigate(`/courses/${courseId}/modules`);
    } catch (error) {
      console.error('Failed to delete module:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-slate-400">Loading...</div>
      </div>
    );
  }

  if (!module) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Module Not Found</h2>
          <p className="text-slate-600 mb-4">The module you are looking for does not exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link
            to={`/courses/${courseId}/modules`}
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Modules
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <span className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 text-slate-600 text-lg font-semibold">
                    {module.order}
                  </span>
                  <h1 className="text-4xl font-bold text-slate-900">{module.name}</h1>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsEditOpen(true)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button variant="destructive" onClick={() => setIsDeleteOpen(true)}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>

            {module.description && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-slate-900 mb-3">Description</h2>
                <p className="text-slate-700 leading-relaxed">{module.description}</p>
              </div>
            )}

            <div className="border-t border-slate-200 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900 mb-2">Lessons</h2>
                  <p className="text-slate-600">Manage lessons for this module</p>
                </div>
                <Button onClick={() => navigate(`/courses/${courseId}/modules/${module._id}/lessons`)}>
                  <BookOpen className="h-4 w-4 mr-2" />
                  View Lessons
                </Button>
              </div>
            </div>

            <div className="border-t border-slate-200 mt-6 pt-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Module Information</h2>
              <dl className="grid grid-cols-1 gap-4">
                <div className="flex justify-between py-3 border-b border-slate-100">
                  <dt className="text-slate-600">Module ID</dt>
                  <dd className="text-slate-900 font-mono text-sm">{module._id}</dd>
                </div>
                <div className="flex justify-between py-3 border-b border-slate-100">
                  <dt className="text-slate-600">Order</dt>
                  <dd className="text-slate-900">{module.order}</dd>
                </div>
                {module.createdAt && (
                  <div className="flex justify-between py-3 border-b border-slate-100">
                    <dt className="text-slate-600">Created</dt>
                    <dd className="text-slate-900">
                      {new Date(module.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>
      </div>

      <ModuleEditDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        module={module || null}
        courseId={courseId || ''}
      />

      <ConfirmDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={handleDelete}
        title="Delete Module"
        warningText="Delete all lessons first or this will fail"
        description={`Are you sure you want to delete "${module?.name}"?`}
        footerText="This action cannot be undone."
        confirmText="Delete Module"
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
};
