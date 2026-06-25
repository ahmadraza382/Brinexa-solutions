import ProjectEditor from "@/app/admin/_components/ProjectEditor";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function EditProjectPage({ params }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: project, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !project) notFound();

  return <ProjectEditor project={project} />;
}
