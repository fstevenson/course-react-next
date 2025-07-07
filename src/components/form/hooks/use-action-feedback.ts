import { useEffect, useRef } from "react";
import { ActionState } from "@/components/form/utils/to-action-state";

type OnArgs = {
    actionState: ActionState;
}


type UseActionFeedbackOptions = {
    onSuccess?: (onArgs: OnArgs) => void;
    onError?: (onArgs: OnArgs) => void;
};

const useActionFeedback = (actionState: ActionState, options: UseActionFeedbackOptions) => {

    const prevTimestamp = useRef(actionState.timestamp);
    const isUpdate = actionState.timestamp !== prevTimestamp.current;

    useEffect(() => {
        if (!isUpdate) return;

        if (actionState.status === "SUCCESS") {
            options.onSuccess?.({ actionState });
        }
        else if (actionState.status === "ERROR") {
            options.onError?.({ actionState });
        }

        prevTimestamp.current = actionState.timestamp;
    }, [isUpdate, actionState, options]);
};

export { useActionFeedback };