import { useEffect } from "react";
import { ActionState } from "@/components/form/utils/to-action-state";

type OnArgs = {
    actionState: ActionState;
}


type UseActionFeedbackOptions = {
    onSuccess?: (onArgs: OnArgs) => void;
    onError?: (onArgs: OnArgs) => void;
};

const useActionFeedback = (actionState: ActionState, options: UseActionFeedbackOptions) => {
    useEffect(() => {
        actionState.status === "SUCCESS" && options.onSuccess?.({ actionState });
        actionState.status === "ERROR" && options.onError?.({ actionState });
    }, [actionState, options]);
};

export { useActionFeedback };