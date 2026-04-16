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

export default function SettingsPage() {
  const { content, loading, error, status, update, save } = useContent();

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-400">Error: {error}</p>;
  if (!content) return null;

  const s = content.settings;
  const setSettings = (next: Partial<typeof s>) =>
    update((c) => ({ ...c, settings: { ...c.settings, ...next } }));
  const setSocials = (next: Record<string, string>) =>
    update((c) => ({
      ...c,
      settings: { ...c.settings, socials: { ...c.settings.socials, ...next } },
    }));

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-4xl text-white">Site Settings</h1>
        <div className="flex items-center gap-4">
          <SaveStatus status={status} />
          <Button onClick={save} disabled={status === "saving"}>
            Save
          </Button>
        </div>
      </div>

      <Card className="space-y-6">
        <h2 className="text-xs font-bold tracking-widest uppercase text-cinema-accent">Identity</h2>
        <FormField label="Name">
          <TextInput value={s.name} onChange={(e) => setSettings({ name: e.target.value })} />
        </FormField>
        <FormField label="Role">
          <TextInput value={s.role} onChange={(e) => setSettings({ role: e.target.value })} />
        </FormField>
        <FormField label="Tagline" hint="Shown below your name in the hero">
          <TextInput value={s.tagline} onChange={(e) => setSettings({ tagline: e.target.value })} />
        </FormField>
        <FormField label="Location">
          <TextInput value={s.location} onChange={(e) => setSettings({ location: e.target.value })} />
        </FormField>
        <FormField label="About Heading" hint='e.g. "Crafting visual narratives with intention."'>
          <TextInput
            value={s.aboutHeading}
            onChange={(e) => setSettings({ aboutHeading: e.target.value })}
          />
        </FormField>
        <FormField label="Profile Photo">
          <SingleImageUploader
            value={s.profilePhotoUrl}
            onChange={(url) => setSettings({ profilePhotoUrl: url })}
          />
        </FormField>
      </Card>

      <Card className="space-y-6">
        <h2 className="text-xs font-bold tracking-widest uppercase text-cinema-accent">Bio</h2>
        <FormField label="Bio" hint="Use blank lines between paragraphs">
          <TextArea
            value={s.bio}
            onChange={(e) => setSettings({ bio: e.target.value })}
            rows={12}
          />
        </FormField>
      </Card>

      <Card className="space-y-6">
        <h2 className="text-xs font-bold tracking-widest uppercase text-cinema-accent">Contact</h2>
        <FormField label="Phone Number" hint="With country code, e.g. +919876543210">
          <TextInput value={s.phone} onChange={(e) => setSettings({ phone: e.target.value })} />
        </FormField>
        <FormField label="WhatsApp Number" hint="Without +, e.g. 919876543210">
          <TextInput
            value={s.whatsapp}
            onChange={(e) => setSettings({ whatsapp: e.target.value })}
          />
        </FormField>
        <FormField label="Email">
          <TextInput
            type="email"
            value={s.email}
            onChange={(e) => setSettings({ email: e.target.value })}
          />
        </FormField>
        <FormField label="Booking URL" hint="Google Calendar / Calendly / any scheduling link. Shows as 'Book a Call' in the hero.">
          <TextInput
            type="url"
            value={s.bookingUrl}
            onChange={(e) => setSettings({ bookingUrl: e.target.value })}
          />
        </FormField>
      </Card>

      <Card className="space-y-6">
        <h2 className="text-xs font-bold tracking-widest uppercase text-cinema-accent">Socials</h2>
        <FormField label="Instagram URL">
          <TextInput
            value={s.socials.instagram}
            onChange={(e) => setSocials({ instagram: e.target.value })}
          />
        </FormField>
        <FormField label="YouTube URL">
          <TextInput
            value={s.socials.youtube}
            onChange={(e) => setSocials({ youtube: e.target.value })}
          />
        </FormField>
        <FormField label="LinkedIn URL">
          <TextInput
            value={s.socials.linkedin}
            onChange={(e) => setSocials({ linkedin: e.target.value })}
          />
        </FormField>
      </Card>

      <div className="flex justify-end gap-4">
        <SaveStatus status={status} />
        <Button onClick={save} disabled={status === "saving"}>
          Save All
        </Button>
      </div>
    </div>
  );
}
