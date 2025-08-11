export type RouteProps<TParams extends Record<string, string>> = {
    params: Promise<TParams>;
};