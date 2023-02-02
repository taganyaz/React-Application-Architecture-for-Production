import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      useErrorBoundary: true,
    },
  },
});

const getQueryKeys = (baseKey: string) => {
  return {
    all: [baseKey],
    many: (params: Record<string, unknown>) => [
      baseKey,
      params,
    ],
    one: (id: string) => [baseKey, id],
  };
};

export const queryKeys = {
  auth: {
    authUser: ['auth-user'],
  },
  jobs: getQueryKeys('jobs'),
  organizations: {
    one: getQueryKeys('organizations').one,
  },
};
