import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ProfileForm } from "./profile-form";

export const metadata = {
  title: "Profile | IBuiltThis",
  description: "Manage your profile and avatar.",
};

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  const userData = {
    id: user.id,
    email: user.email ?? null,
    user_metadata: user.user_metadata,
  };

  return (
    <div className="container mx-auto max-w-xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Profile</h1>
      <ProfileForm user={userData} />
    </div>
  );
}
