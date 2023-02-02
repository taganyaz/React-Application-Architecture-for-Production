import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';
import { queryKeys } from '@/lib/react-query';

import { Job } from '../types';

type GetJobOptions = {
  jobId: string;
};

export const getJob = ({
  jobId,
}: GetJobOptions): Promise<Job> => {
  return apiClient.get(`/jobs/${jobId}`);
};

export const useJob = ({ jobId }: GetJobOptions) => {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.jobs.one(jobId), //['jobs', jobId],
    queryFn: () => getJob({ jobId }),
  });

  return { data, isLoading };
};
