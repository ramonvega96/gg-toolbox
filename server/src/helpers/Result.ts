export function success<T>(payload?: T, message?: string): SuccessReturn<T> {
    return {
        success: true,
        payload,
        message,
    };
}

export function failure(message?: string, error?: unknown): FailReturn {
    return {
        success: false,
        message,
        error,
    };
}

interface WrapReturn<T> {
    success: boolean;
    payload?: T;
    message?: string;
}

export interface SuccessReturn<T> extends WrapReturn<T> {
    success: true;
    payload: T;
    message?: string;
}

export interface FailReturn extends WrapReturn<void> {
    success: false;
    message?: string;
    error?: unknown;
}
