import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';
import { queryKeys } from '@/lib/react-query';

import { Job } from '../types';

type GetJobsOptions = {
  params: {
    organizationId: string | undefined;
  };
};

export const getJobs = ({
  params,
}: GetJobsOptions): Promise<Job[]> => {
  return apiClient.get('/jobs', {
    params,
  });
};

export const getAllJobs = (): Promise<Job[]> => {
  return apiClient.get('/jobs');
};

export const useJobs = ({ params }: GetJobsOptions) => {
  const { data, isFetching, isFetched } = useQuery({
    queryKey: queryKeys.jobs.many(params), //['jobs', params],
    queryFn: () => getJobs({ params }),
    enabled: !!params.organizationId,
    initialData: [],
  });

  return {
    data,
    isLoading: isFetching && !isFetched,
  };
};
