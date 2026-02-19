import { redirect } from "next/navigation";
import { CardCompact } from "@/components/card-compact";
import { PasswordResetForm } from "@/features/auth/components/password-reset-form";
import { passwordForgotPath } from "@/constants/paths";

type PasswordResetPageProps = {
    searchParams: Promise<{ token?: string }>;
};

const PasswordResetPage = async ({ searchParams }: PasswordResetPageProps) => {
    const { token } = await searchParams;

    if (!token) {
        redirect(passwordForgotPath());
    }

    return (
        <div className="flex-1 flex flex-col justify-center items-center">
            <CardCompact
                title="Reset Password"
                description="Enter your new password"
                className="w-full max-w-105 animate-fade-from-top"
                content={<PasswordResetForm token={token} />}
            />
        </div>
    );
};

export default PasswordResetPage;
