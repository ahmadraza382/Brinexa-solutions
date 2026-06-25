import PostEditor from "@/app/admin/_components/PostEditor";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function EditPostPage({ params }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !post) notFound();

  return <PostEditor post={post} />;
}
