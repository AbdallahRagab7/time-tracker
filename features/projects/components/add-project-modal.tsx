"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useProjectStore } from "../store/project-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Project } from "@/features/shared/types";

// Form schema using Zod
const projectFormSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  client: z.string().min(1, "Client name is required"),
  color: z.string().min(1, "Color is required"),
  hourlyRate: z
    .string()
    .min(1, "Hourly rate is required")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      "Hourly rate must be a number"
    ),
  currency: z.string().min(1, "Currency is required"),
  status: z.enum(["active", "archived"]),
});

type ProjectFormValues = z.infer<typeof projectFormSchema>;

const COLORS = [
  { value: "#FF6B6B", label: "Red" },
  { value: "#4ECDC4", label: "Teal" },
  { value: "#45B7D1", label: "Blue" },
  { value: "#FFA07A", label: "Coral" },
  { value: "#98D8C8", label: "Mint" },
  { value: "#F7DC6F", label: "Yellow" },
  { value: "#BB8FCE", label: "Lavender" },
  { value: "#A2D9CE", label: "Seafoam" },
];

interface AddProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingProject?: Project | null;
  onClose: () => void;
}

export function AddProjectModal({
  open,
  onOpenChange,
  editingProject,
  onClose,
}: AddProjectModalProps) {
  const { addProject, updateProject } = useProjectStore();

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      name: "",
      client: "",
      color: "#3b82f6",
      hourlyRate: "",
      currency: "USD",
      status: "active",
    },
  });

  // Set form values when editing
  useEffect(() => {
    if (editingProject) {
      form.reset({
        name: editingProject.name,
        client: editingProject.client || "",
        color: editingProject.color,
        hourlyRate: editingProject.hourlyRate?.toString() || "",
        currency: editingProject.currency || "USD",
        status: editingProject.status || "active",
      });
    } else {
      form.reset({
        name: "",
        client: "",
        color: "#3b82f6",
        hourlyRate: "",
        currency: "USD",
        status: "active",
      });
    }
  }, [editingProject, form]);

  const currencies = [
    { code: "USD", symbol: "$" },
    { code: "EUR", symbol: "€" },
    { code: "EGP", symbol: "£" },
  ];

  const onSubmit = (data: ProjectFormValues) => {
    const projectData = {
      name: data.name.trim(),
      client: data.client.trim(),
      color: data.color,
      hourlyRate: Number.parseFloat(data.hourlyRate) || 0,
      currency: data.currency,
      status: data.status,
      updatedAt: new Date().toISOString(),
    };

    if (editingProject) {
      updateProject(editingProject.id, projectData);
    } else {
      addProject({
        ...projectData,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      });
    }

    reset();
    onClose();
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      reset();
    }
    onOpenChange(open);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = form;
  const selectedColor = watch("color");

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {editingProject ? "Edit Project" : "Add New Project"}
          </DialogTitle>
          <DialogDescription>
            {editingProject
              ? "Update your project details"
              : "Add a new project to track your time"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <div>
            <label>
              Project Name <span className="text-destructive">*</span>
            </label>
            <Input
              placeholder="e.g. Website Redesign"
              className="mt-1 border-border bg-background"
              {...register("name")}
            />
            {errors.name && <p className="error">{errors.name.message}</p>}
          </div>

          <div>
            <label>
              Client <span className="text-destructive">*</span>
            </label>
            <Input
              placeholder="Client name"
              className="mt-1 border-border bg-background"
              {...register("client")}
            />
            {errors.client && <p className="error">{errors.client.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>
                Hourly Rate <span className="text-destructive">*</span>
              </label>
              <Input
                type="number"
                step="0.01"
                min="0"
                className="mt-1 border-border bg-background"
                {...register("hourlyRate")}
              />
              {errors.hourlyRate && (
                <p className="error">{errors.hourlyRate.message}</p>
              )}
            </div>

            <div>
              <label>
                Currency <span className="text-destructive">*</span>
              </label>
              <Select
                value={watch("currency")}
                onValueChange={(value) => setValue("currency", value)}
              >
                <SelectTrigger className="mt-1 border-border bg-background">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent className="bg-background border-border">
                  {currencies.map(({ code, symbol }) => (
                    <SelectItem key={code} value={code}>
                      {code} ({symbol})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.currency && (
                <p className="error">{errors.currency.message}</p>
              )}
            </div>
          </div>

          <div>
            <label>
              Status <span className="text-destructive">*</span>
            </label>
            <Select
              value={watch("status")}
              onValueChange={(value) =>
                setValue("status", value as "active" | "archived")
              }
            >
              <SelectTrigger className="mt-1 border-border bg-background">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-background border-border">
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
            {errors.status && <p className="error">{errors.status.message}</p>}
          </div>

          <div>
            <label>Color</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {COLORS.map((colorItem) => (
                <button
                  key={colorItem.value}
                  type="button"
                  className={`h-7 w-7 rounded-full transition-transform hover:scale-110 ${selectedColor === colorItem.value
                    ? "ring-2 ring-offset-2 ring-primary"
                    : ""
                    }`}
                  style={{ backgroundColor: colorItem.value }}
                  onClick={() => setValue("color", colorItem.value)}
                  aria-label={`Select color ${colorItem.label}`}
                />
              ))}
            </div>
            <input type="hidden" {...register("color")} />
            {errors.color && <p className="error">{errors.color.message}</p>}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              className="!px-7"
              onClick={() => {
                onClose();
                reset();
              }}
            >
              Cancel
            </Button>
            <Button type="submit">
              {editingProject ? "Update" : "Add"} Project
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
