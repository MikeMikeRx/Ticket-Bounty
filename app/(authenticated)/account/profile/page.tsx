import { Heading } from "@/components/heading";
import { AccountTabs } from "@/app/(authenticated)/account/_navigation/tabs";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { ProfileForm } from "@/features/auth/components/profile-form";
import { CardCompact } from "@/components/card-compact";

const ProfilePage = async () => {
    const { user } = await getAuthOrRedirect();

    return (
        <div className="flex-1 flex flex-col gap-y-8">
            <Heading
                title="Profile"
                description="All your profile information"
                tabs={<AccountTabs />}
            />
 
            <div className="flex flex-col items-center">
                <CardCompact
                    className="w-full max-w-105 animate-fade-from-top"
                    title="Profile"
                    description="Update your username and email"
                    content={<ProfileForm user={user} />}
                />
            </div>
       </div>
    );
};

export default ProfilePage;
