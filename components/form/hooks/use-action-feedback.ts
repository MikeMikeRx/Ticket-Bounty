import { useEffect, useRef } from "react";
import { ActionState } from "../utils/to-action-state";

type UseActionFeedbackOptions<T = unknown> = {
    onSuccess?: (actionState: ActionState<T>) => void;
    onError?: (actionState: ActionState<T>) => void;
};

const useActionFeedback = <T = unknown>(
    actionState: ActionState<T>,
    options: UseActionFeedbackOptions<T>
) => {
    const prevTimestamp = useRef(actionState.timestamp);

    useEffect(() => {
        const isUpdate = prevTimestamp.current !== actionState.timestamp;
        if(!isUpdate) return;

        if (actionState.status === "SUCCESS") {
            options.onSuccess?.(actionState);
        }
        if (actionState.status === "ERROR") {
            options.onError?.(actionState);
        }

        prevTimestamp.current = actionState.timestamp;
    }, [actionState, options]);
};

export { useActionFeedback };