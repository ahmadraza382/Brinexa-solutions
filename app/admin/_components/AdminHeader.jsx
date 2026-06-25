import { createClient } from "@/lib/supabase/server";

export default async function AdminHeader() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="h-14 border-b border-[#2E2E4A] bg-[#0D0D0D] flex items-center justify-end px-6 shrink-0">
      {user && (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6C3FD4] to-[#00C9A7] flex items-center justify-center">
            <span className="text-white text-xs font-bold">
              {user.email?.[0]?.toUpperCase() ?? "A"}
            </span>
          </div>
          <span className="text-[#AAAAAA] text-sm hidden sm:block">
            {user.email}
          </span>
        </div>
      )}
    </header>
  );
}
