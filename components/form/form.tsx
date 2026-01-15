import { useActionState } from "react";
import { toast } from "sonner";
import { useActionFeedback } from "./hooks/use-action-feedback";
import { EMPTY_ACTION_STATE, ActionState } from "./utils/to-action-state";

type FormProps = {
    action: (
        actionState: ActionState,
        formData: FormData
    ) => ActionState | Promise <ActionState>;
    children: (actionState: ActionState) => React.ReactNode;
};

const Form = ({ action, children }: FormProps) => {
    const [actionState, formAction] = useActionState(action, EMPTY_ACTION_STATE);

    useActionFeedback(actionState, {
        onSuccess: ({ actionState }) => {
            if (actionState.message){
                toast.success(actionState.message);
            }
        },
        onError: ({ actionState }) => {
            if (actionState.message) {
                toast.error(actionState.message);
            }
        },
    });

    return (
        <form action={formAction} className="flex flex-col gap-y-2">
            {children(actionState)}

            <noscript>
                {actionState.status === "ERROR" && (
                    <div style={{ color: "red" }}>{actionState.message}</div>
                )}

                {actionState.status === "SUCCESS" && (
                    <div style={{ color: "green" }}>{actionState.message}</div>
                )}
            </noscript>
        </form>
    );
};

export { Form };