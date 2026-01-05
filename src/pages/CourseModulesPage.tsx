import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Plus, Loader2, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '../components/ui/Dialog';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { ModuleForm } from '../components/ModuleForm';
import { ModuleEditDialog } from '../components/ModuleEditDialog';
import { ModuleList } from '../components/ModuleList';
import { useModulesByCourse, useCreateModule, useDeleteModule } from '../hooks/useModules';
import { useCourses } from '../hooks/useCourses';
import type { Module, CreateModuleDto, UpdateModuleDto } from '../types/module';

export const CourseModulesPage = () => {
  const { id: courseId } = useParams<{ id: string }>();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);

  const { data: courses = [] } = useCourses();
  const course = courses.find(c => c._id === courseId);
  const { data: modules = [], isLoading, error } = useModulesByCourse(courseId || '');
  const createMutation = useCreateModule();
  const deleteMutation = useDeleteModule();

  const handleCreate = async (data: CreateModuleDto | UpdateModuleDto) => {
    try {
      await createMutation.mutateAsync(data as CreateModuleDto);
      setIsCreateOpen(false);
    } catch (error) {
      console.error('Failed to create module:', error);
    }
  };

  const handleEditSuccess = () => {
    setSelectedModule(null);
  };

  const handleDeleteClick = (module: Module) => {
    setSelectedModule(module);
    setIsDeleteOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedModule) return;
    try {
      await deleteMutation.mutateAsync(selectedModule._id);
      setIsDeleteOpen(false);
      setSelectedModule(null);
    } catch (error) {
      console.error('Failed to delete module:', error);
    }
  };

  const handleEdit = (module: Module) => {
    setSelectedModule(module);
    setIsEditOpen(true);
  };

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Modules</h2>
          <p className="text-slate-600">
            {error instanceof Error ? error.message : 'Failed to load modules'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link
            to={`/courses/${courseId}`}
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Course
          </Link>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl font-bold text-slate-900">
                {course?.name || 'Course'} - Modules
              </h1>
              <p className="mt-2 text-slate-600">
                Manage modules and content for this course
              </p>
            </div>
            <Button 
              onClick={() => setIsCreateOpen(true)}
              className="flex-shrink-0"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Module
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
            </div>
          ) : (
            <ModuleList
              courseId={courseId || ''}
              modules={modules}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
            />
          )}
        </div>
      </div>

      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Module</DialogTitle>
            <DialogClose onClick={() => setIsCreateOpen(false)} />
          </DialogHeader>
          <ModuleForm
            courseId={courseId || ''}
            onSubmit={handleCreate}
            onCancel={() => setIsCreateOpen(false)}
            isLoading={createMutation.isPending}
          />
        </DialogContent>
      </Dialog>

      <ModuleEditDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        module={selectedModule}
        courseId={courseId || ''}
        onSuccess={handleEditSuccess}
      />

      <ConfirmDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={handleDelete}
        title="Delete Module"
        warningText="Delete all lessons first or this will fail"
        description={`Are you sure you want to delete "${selectedModule?.name}"?`}
        footerText="This action cannot be undone."
        confirmText="Delete Module"
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
};
