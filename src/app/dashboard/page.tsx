"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";


function Dashboard() {
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "loading") return; // Wait for session to load
        if (!session) {
            redirect('/');
        }
    }, [session, status]);

    if (status === "loading") {
        return null; // Or a loading spinner
    }
    if (!session) {
        return null;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
            <div className="mb-8 p-6 border rounded-lg shadow-md bg-slate-50">
                <p className="text-gray-600 mb-4">Your dashboard is coming soon.</p>
            </div>
        </div>
    )
}

export default Dashboard;
