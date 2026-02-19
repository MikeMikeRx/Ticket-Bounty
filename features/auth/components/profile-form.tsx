"use client";

import { useActionState } from "react";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button";
import { FieldError } from "@/components/form/field-error";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { updateProfile } from "../actions/update-profile";

type ProfileFormProps = {
    user: {
        username: string;
        email: string;
    };
};

const ProfileForm = ({ user }: ProfileFormProps) => {
    const [actionState, action] = useActionState(updateProfile, EMPTY_ACTION_STATE);

    return (
        <Form action={action} actionState={actionState}>
            <Label htmlFor="currentUsername">Username</Label>
            <Input
                id="currentUsername"
                type="text"
                value={user.username}
                disabled
                onChange={() => {}}
            />

            <Label htmlFor="username">New Username</Label>
            <Input
                key={`username-${actionState.timestamp}`}
                id="username"
                name="username"
                type="text"
                defaultValue={
                    actionState.status === "ERROR"
                        ? (actionState.payload?.get("username") as string) ?? ""
                        : ""
                }
            />
            <FieldError actionState={actionState} name="username" />

            <Label htmlFor="currentEmail">Email address</Label>
            <Input
                id="currentEmail"
                type="email"
                value={user.email}
                disabled
                onChange={() => {}}
            />

            <Label htmlFor="email">New Email</Label>
            <Input
                key={`email-${actionState.timestamp}`}
                id="email"
                name="email"
                type="email"
                defaultValue={
                    actionState.status === "ERROR"
                        ? (actionState.payload?.get("email") as string) ?? ""
                        : ""
                }
            />
            <FieldError actionState={actionState} name="email" />

            <SubmitButton label="Save" />
        </Form>
    );
};

export { ProfileForm };
