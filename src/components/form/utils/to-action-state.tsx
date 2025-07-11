import { ZodError } from "zod";

export type ActionState = {
    status?: "SUCCESS" | "ERROR";
    message: string;
    payload?: FormData;
    fieldErrors?: Record<string, string[] | undefined>;
    timestamp: number;
}

export const EMPTY_ACTION_STATE: ActionState = {
    message: "",
    fieldErrors: {},
    timestamp: Date.now()
}

export const fromErrorToActionState = (error: unknown, formData?: FormData): ActionState => {

    if (error instanceof ZodError) {
        return {
            status: "ERROR",
            message: error.errors[0].message,
            fieldErrors: error.flatten().fieldErrors,
            payload: formData,
            timestamp: Date.now()
        }
    } else if (error instanceof Error) {
        // database error
        return {
            status: "ERROR",
            message: error.message,
            fieldErrors: undefined,
            payload: formData,
            timestamp: Date.now()
        }
    }
    // unexpected error
    return {
        status: "ERROR",
        message: "Something went wrong. Please try again.",
        fieldErrors: undefined,
        payload: formData,
        timestamp: Date.now()
    };
}

export const toActionState = (status: ActionState["status"], message: string): ActionState => {
    return {
        status,
        message,
        fieldErrors: {},
        timestamp: Date.now()
    }
}