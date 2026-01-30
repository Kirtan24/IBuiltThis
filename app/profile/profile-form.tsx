"use client";

import { useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Loader2, Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const profileSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const AVATAR_BUCKET = "avatars";

function getInitials(email: string | undefined, name?: string | null) {
  if (name && name.trim()) {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  }
  if (email) return email.slice(0, 2).toUpperCase();
  return "?";
}

type UserData = {
  id: string;
  email: string | null;
  user_metadata: Record<string, unknown>;
};

export function ProfileForm({ user }: { user: UserData }) {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(
    (user.user_metadata?.avatar_url as string) ?? null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: (user.user_metadata?.full_name as string) ?? "",
    },
  });

  const onSaveProfile = async (data: ProfileFormData) => {
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({
      data: { full_name: data.fullName },
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Profile updated.");
    router.refresh();
  };

  const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user.id) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file.");
      return;
    }
    setUploading(true);
    const supabase = createClient();
    const ext = file.name.split(".").pop() || "jpg";
    const path = `${user.id}/avatar.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from(AVATAR_BUCKET)
      .upload(path, file, { upsert: true });
    if (uploadError) {
      toast.error(uploadError.message);
      setUploading(false);
      return;
    }
    const { data: urlData } = supabase.storage
      .from(AVATAR_BUCKET)
      .getPublicUrl(path);
    const publicUrl = urlData.publicUrl;
    const { error: updateError } = await supabase.auth.updateUser({
      data: { avatar_url: publicUrl },
    });
    if (updateError) {
      toast.error(updateError.message);
      setUploading(false);
      return;
    }
    setAvatarUrl(publicUrl);
    toast.success("Avatar updated.");
    setUploading(false);
    router.refresh();
  };

  const displayName =
    (user.user_metadata?.full_name as string) || user.email?.split("@")[0] || "";
  const currentAvatar =
    avatarUrl ?? (user.user_metadata?.avatar_url as string | undefined);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your info</CardTitle>
        <CardDescription>
          Update your display name and profile image. Session is stored so you
          stay logged in.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarImage src={currentAvatar} alt={displayName} />
              <AvatarFallback className="text-lg">
                {getInitials(user.email ?? undefined, displayName)}
              </AvatarFallback>
            </Avatar>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={onAvatarChange}
              disabled={uploading}
            />
            <Button
              type="button"
              size="icon"
              variant="secondary"
              className="absolute bottom-0 right-0 size-8 rounded-full"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
              {uploading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Upload className="size-4" />
              )}
            </Button>
          </div>
          <div className="flex-1 text-sm text-muted-foreground">
            Click the button to upload a new avatar. JPG, PNG or GIF.
          </div>
        </div>

        <Separator />

        <form onSubmit={handleSubmit(onSaveProfile)} className="space-y-4">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                value={user.email ?? ""}
                readOnly
                disabled
                className="bg-muted"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Email cannot be changed here.
              </p>
            </Field>
            <Field>
              <FieldLabel htmlFor="fullName">Display name</FieldLabel>
              <Input
                id="fullName"
                placeholder="Your name"
                {...register("fullName")}
                disabled={isSubmitting}
              />
              {errors.fullName && (
                <p className="mt-1 text-xs text-destructive">
                  {errors.fullName.message}
                </p>
              )}
            </Field>
          </FieldGroup>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Saving…
              </>
            ) : (
              "Save profile"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
