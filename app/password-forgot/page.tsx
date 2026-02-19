import Link from "next/link";
import { CardCompact } from "@/components/card-compact";
import { PasswordForgotForm } from "@/features/auth/components/password-forgot-form";
import { signInPath } from "@/constants/paths";

const PasswordForgotPage = () => {
    return (
        <div className="flex-1 flex flex-col justify-center items-center">
            <CardCompact
                title="Forgot Password"
                description="Enter your email to receive a reset link"
                className="w-full max-w-105 animate-fade-from-top"
                content={<PasswordForgotForm />}
                footer={
                    <Link className="text-sm text-muted-foreground" href={signInPath()}>
                        Back to Sign In
                    </Link>
                }
            />
        </div>
    );
};

export default PasswordForgotPage;
