import { useEffect } from "react";
import { ActionState } from "../utils/to-action-state";

type OnArgs = {
    actionState: ActionState;
};

type UseActionFeedbackOptions = {
    onSuccess?: (OnArgs: OnArgs) => void;
    onError?: (OnArgs: OnArgs) => void;
};

const UseActionFeedback = (
    actionState: ActionState,
    options: UseActionFeedbackOptions
) => {
    useEffect(() => {
        if (actionState.status === "SUCCESS") {
            options.onSuccess?.({ actionState });
        }
        if (actionState.status === "ERROR") {
            options.onError?.({ actionState });
        }
    }, [actionState, options]);
};

export { UseActionFeedback };