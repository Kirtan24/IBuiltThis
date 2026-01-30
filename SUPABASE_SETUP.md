# Supabase setup for this project

## Auth (already configured in code)

- **Email auth**: Sign in / Sign up use Supabase Auth. Session is stored in cookies, so you stay logged in when you return (no need to log in again).
- **Disable confirmation email** (optional): In Supabase Dashboard → **Authentication** → **Providers** → **Email**, turn off **Confirm email** so users can sign in right after sign up.

## Storage: profile avatars

To enable profile image upload, create a **Storage bucket** in Supabase:

1. In Supabase Dashboard go to **Storage**.
2. Click **New bucket**.
3. Name: `avatars`.
4. Enable **Public bucket** (so avatar URLs can be used in `<img>`).
5. Click **Create bucket**.
6. Open the bucket → **Policies** → **New policy**.
7. Use a policy that allows:
   - **SELECT** (read) for everyone (public bucket).
   - **INSERT** and **UPDATE** for authenticated users, with a rule like: `(bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text)` so users can only upload into their own folder.

Or use the SQL Editor:

```sql
-- Allow public read
create policy "Avatar images are publicly accessible"
on storage.objects for select
using (bucket_id = 'avatars');

-- Allow authenticated users to upload/update their own folder only
create policy "Users can upload their own avatar"
on storage.objects for insert
with check (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);

create policy "Users can update their own avatar"
on storage.objects for update
using (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);
```

After this, the Profile page can upload and display avatars.
