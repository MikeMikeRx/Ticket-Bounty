import { toast } from "sonner";
import { useActionFeedback } from "./hooks/use-action-feedback";
import { ActionState } from "./utils/to-action-state";

type FormProps<T = unknown> = {
    action: (payload: FormData) => void | Promise<void>;
    actionState: ActionState<T>;
    children: React.ReactNode;
    onSuccess?: (actionState: ActionState<T>) => void;
    onError?: (actionState: ActionState<T>) => void;
};

function Form <T = unknown>({ action, actionState, children, onSuccess, onError }: FormProps<T>) {
    useActionFeedback(actionState, {
        onSuccess: ( actionState ) => {
            if (actionState.message){
                toast.success(actionState.message);
            }

            onSuccess?.(actionState);
        },
        onError: (actionState) => {
            if (actionState.message) {
                toast.error(actionState.message);
            }

            onError?.(actionState);
        },
    });

    return (
        <form action={action} className="flex flex-col gap-y-2">
            {children}

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