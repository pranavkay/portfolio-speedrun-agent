"use client";

import { useContent } from "@/components/admin/ContentProvider";
import {
  FormField,
  TextInput,
  TextArea,
  Button,
  Card,
  SaveStatus,
} from "@/components/admin/AdminUI";
import { SingleImageUploader } from "@/components/admin/ImageUploader";
import { Testimonial } from "@/lib/types";
import { Trash2, Plus } from "lucide-react";

const blankTestimonial = (order: number): Testimonial => ({
  id: Date.now().toString(),
  name: "",
  role: "",
  quote: "",
  order,
});

export default function TestimonialsPage() {
  const { content, loading, error, status, update, save } = useContent();

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-400">Error: {error}</p>;
  if (!content) return null;

  const testimonials = [...content.testimonials].sort((a, b) => a.order - b.order);

  const updateTestimonial = (id: string, patch: Partial<Testimonial>) => {
    update((c) => ({
      ...c,
      testimonials: c.testimonials.map((t) => (t.id === id ? { ...t, ...patch } : t)),
    }));
  };

  const deleteTestimonial = (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    update((c) => ({ ...c, testimonials: c.testimonials.filter((t) => t.id !== id) }));
  };

  const addTestimonial = () => {
    const t = blankTestimonial(testimonials.length);
    update((c) => ({ ...c, testimonials: [...c.testimonials, t] }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-4xl text-white">Testimonials</h1>
        <div className="flex items-center gap-4">
          <SaveStatus status={status} />
          <Button onClick={addTestimonial} variant="secondary">
            <Plus className="w-3 h-3 inline mr-2" /> Add
          </Button>
          <Button onClick={save} disabled={status === "saving"}>
            Save
          </Button>
        </div>
      </div>

      {testimonials.length === 0 && (
        <p className="text-gray-500 text-center py-12">
          No testimonials yet. Click <span className="text-cinema-accent">Add</span> to create one.
        </p>
      )}

      <div className="space-y-4">
        {testimonials.map((t) => (
          <Card key={t.id} className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                <FormField label="Name">
                  <TextInput
                    value={t.name}
                    onChange={(e) => updateTestimonial(t.id, { name: e.target.value })}
                  />
                </FormField>
                <FormField label="Role / Company">
                  <TextInput
                    value={t.role}
                    onChange={(e) => updateTestimonial(t.id, { role: e.target.value })}
                  />
                </FormField>
              </div>
              <button
                onClick={() => deleteTestimonial(t.id)}
                className="ml-4 p-2 text-gray-500 hover:text-red-400"
                aria-label="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <FormField label="Quote">
              <TextArea
                value={t.quote}
                onChange={(e) => updateTestimonial(t.id, { quote: e.target.value })}
                rows={4}
              />
            </FormField>
            <FormField label="Avatar (optional)">
              <SingleImageUploader
                value={t.avatarUrl || ""}
                onChange={(url) => updateTestimonial(t.id, { avatarUrl: url || undefined })}
              />
            </FormField>
            <FormField label="Display order" hint="Lower numbers shown first">
              <TextInput
                type="number"
                value={t.order}
                onChange={(e) =>
                  updateTestimonial(t.id, { order: parseInt(e.target.value, 10) || 0 })
                }
              />
            </FormField>
          </Card>
        ))}
      </div>

      {testimonials.length > 0 && (
        <div className="flex justify-end gap-4">
          <SaveStatus status={status} />
          <Button onClick={save} disabled={status === "saving"}>
            Save All
          </Button>
        </div>
      )}
    </div>
  );
}
