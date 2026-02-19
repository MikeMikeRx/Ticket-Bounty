"use client";

import { useActionState } from "react";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button";
import { FieldError } from "@/components/form/field-error";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { passwordForgot } from "../actions/password-forgot";

const PasswordForgotForm = () => {
    const [actionState, action] = useActionState(passwordForgot, EMPTY_ACTION_STATE);

    return (
        <Form action={action} actionState={actionState}>
            <Label htmlFor="email">Email address</Label>
            <Input
                id="email"
                name="email"
                type="email"
                defaultValue={(actionState.payload?.get("email") as string) ?? ""}
            />
            <FieldError actionState={actionState} name="email" />

            <SubmitButton label="Send Reset Link" />
        </Form>
    );
};

export { PasswordForgotForm };
