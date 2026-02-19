import { Heading } from "@/components/heading";
import { AccountTabs } from "@/app/(authenticated)/account/_navigation/tabs";
import { PasswordForm } from "@/features/auth/components/password-form";
import { CardCompact } from "@/components/card-compact";

const PasswordPage = () => {
    return (
        <div className="flex-1 flex flex-col gap-y-8">
            <Heading
                title="Password"
                description="Keep your account secure"
                tabs={<AccountTabs />}
            />
            
            <div className="flex flex-col items-center">
                <CardCompact
                    className="w-full max-w-105 animate-fade-from-top"
                    title="Password"
                    description="Change your password"
                    content={<PasswordForm />}
                />
            </div>
        </div>
    );
};

export default PasswordPage;