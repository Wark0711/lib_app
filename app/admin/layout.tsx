import { ReactNode } from "react";
import '@/styles/admin.css'
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { Sidebar } from "@/components/admin/Sidebar";
import { AdminHeader } from "@/components/admin/Header";
import { checkForAdmin } from "@/lib/admin/actions/book";

export default async function AdminLayout({ children }: { children: ReactNode }) {

    const session = await auth()
    if (!session?.user?.id) return redirect('/sign-in')

    // const isAdmin = await checkForAdmin(session)
    // if (!isAdmin) return redirect('/')

    return (
        <main className="flex min-h-screen w-full flex-row">
            <Sidebar session={session} />

            <div className="admin-container">
                <AdminHeader session={session} />
                {children}
            </div>
        </main>
    )
}