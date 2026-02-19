"use client";

import { useActionState } from "react";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button";
import { FieldError } from "@/components/form/field-error";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { passwordReset } from "../actions/password-reset";

type PasswordResetFormProps = {
    token: string;
};

const PasswordResetForm = ({ token }: PasswordResetFormProps) => {
    const [actionState, action] = useActionState(passwordReset, EMPTY_ACTION_STATE);

    return (
        <Form action={action} actionState={actionState}>
            <input type="hidden" name="token" value={token} />

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

            <SubmitButton label="Reset Password" />
        </Form>
    );
};

export { PasswordResetForm };
