import { Button, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';

import { Loading } from '@/components/loading';
import { NotFound } from '@/components/not-found';
import { Seo } from '@/components/seo';
import {
  DashboardJobInfo,
  useJob,
} from '@/features/jobs';
import { DashboardLayout } from '@/layouts/dashboard-layout';

const DashboardJobPage = () => {
  const router = useRouter();
  const jobId = router.query.jobId as string;

  const job = useJob({ jobId });

  if (job.isLoading) {
    return <Loading />;
  }

  if (!job.data) {
    return <NotFound />;
  }

  return (
    <>
      <Seo
        title={`${job.data.position} | ${job.data.location}`}
      />
      <Stack w="full">
        <DashboardJobInfo job={job.data} />
        <Stack w="full" direction="row">
          <Button
            bg="primary"
            color="primaryAccent"
            as="a"
            href={`/dashboard/jobs/${jobId}/update`}
            _hover={{
              opacity: 0.9,
            }}
          >
            Edit
          </Button>
          <Button
            bg="orange"
            onClick={() => router.push('/dashboard/jobs')}
          >
            Back to List
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

DashboardJobPage.getLayout = function getLayout(
  page: ReactElement
) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default DashboardJobPage;
