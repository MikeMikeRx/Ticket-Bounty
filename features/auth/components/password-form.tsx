"use client";

import { useActionState } from "react";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button";
import { FieldError } from "@/components/form/field-error";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { updatePassword } from "../actions/update-password";

const PasswordForm = () => {
    const [actionState, action] = useActionState(updatePassword, EMPTY_ACTION_STATE);

    return (
        <Form action={action} actionState={actionState}>
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
                id="currentPassword"
                name="currentPassword"
                type="password"
            />
            <FieldError actionState={actionState} name="currentPassword" />

            <Label htmlFor="newPassword">New Password</Label>
            <Input
                id="newPassword"
                name="newPassword"
                type="password"
            />
            <FieldError actionState={actionState} name="newPassword" />

            <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
            <Input
                id="confirmNewPassword"
                name="confirmNewPassword"
                type="password"
            />
            <FieldError actionState={actionState} name="confirmNewPassword" />

            <SubmitButton label="Save" />
        </Form>
    );
};

export { PasswordForm };
