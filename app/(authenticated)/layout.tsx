import { redirect } from "next/navigation";
import { getAuth } from "@/features/auth/queries/get-auth";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { signInPath } from "@/constants/paths";

export default async function AuthenticatedLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    await getAuthOrRedirect();
    
    const { user } = await getAuth();

    if (!user) {
        redirect(signInPath());
    }

    return <>{children}</>;
}