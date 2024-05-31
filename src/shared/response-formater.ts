
interface SuccessResponseParams<T = any> {
    message?: string;
    data?: T;
  }

export function ResponseFormatter<T>({
    message = 'Request was successful',
    data,
  }: SuccessResponseParams<T>) {
    return {
        success: true,
        message,
        data,
      };
  }
  