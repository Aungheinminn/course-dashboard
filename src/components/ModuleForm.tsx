import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import type { Module, CreateModuleDto, UpdateModuleDto } from "../types/module";
import { Textarea } from "@/components/ui/textarea";

interface ModuleFormProps {
  courseId: string;
  module?: Module;
  onSubmit: (data: CreateModuleDto | UpdateModuleDto) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export const ModuleForm = ({
  courseId,
  module,
  onSubmit,
  onCancel,
  isLoading,
}: ModuleFormProps) => {
  const [formData, setFormData] = useState({
    name: module?.name || "",
    description: module?.description || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = module ? formData : { ...formData, course_id: courseId };
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
          placeholder="Enter module name"
          required
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Enter module description"
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : module ? "Update Module" : "Create Module"}
        </Button>
      </div>
    </form>
  );
};
