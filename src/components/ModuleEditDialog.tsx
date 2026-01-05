import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from './ui/Dialog';
import { ModuleForm } from './ModuleForm';
import { useUpdateModule } from '../hooks/useModules';
import type { Module, CreateModuleDto, UpdateModuleDto } from '../types/module';

interface ModuleEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  module: Module | null;
  courseId: string;
  onSuccess?: () => void;
}

export const ModuleEditDialog = ({ open, onOpenChange, module, courseId, onSuccess }: ModuleEditDialogProps) => {
  const updateMutation = useUpdateModule();

  const handleUpdate = async (data: CreateModuleDto | UpdateModuleDto) => {
    if (!module) return;
    try {
      await updateMutation.mutateAsync({ id: module._id, module: data as UpdateModuleDto });
      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      console.error('Failed to update module:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Module</DialogTitle>
          <DialogClose onClick={() => onOpenChange(false)} />
        </DialogHeader>
        {module && (
          <ModuleForm
            courseId={courseId}
            module={module}
            onSubmit={handleUpdate}
            onCancel={() => onOpenChange(false)}
            isLoading={updateMutation.isPending}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
