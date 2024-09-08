export type withStatus<T> = T & { status: "pending" | "success" | "error" };
