import { Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';

import { Loading } from '@/components/loading';
import { NotFound } from '@/components/not-found';
import { Seo } from '@/components/seo';
import { useJob } from '@/features/jobs';
import { UpdateJobForm } from '@/features/jobs';
import { DashboardLayout } from '@/layouts/dashboard-layout';
import { useNotifications } from '@/stores/notifications';

const DashboardUpdateJobPage = () => {
  const router = useRouter();
  const { showNotification } = useNotifications();
  const jobId = router.query.jobId as string;
  const job = useJob({ jobId });

  const onSuccess = () => {
    showNotification({
      type: 'success',
      title: 'Success',
      duration: 5000,
      message: 'Job Updated!',
    });

    router.push('/dashboard/jobs');
  };

  if (job.isLoading) return <Loading />;

  if (!job.data) return <NotFound />;

  return (
    <>
      <Seo title="Update Job" />
      <Heading mb="8">Update Job</Heading>
      <UpdateJobForm
        job={job.data}
        onSuccess={onSuccess}
      />
    </>
  );
};

DashboardUpdateJobPage.getLayout = (
  page: ReactElement
) => <DashboardLayout>{page}</DashboardLayout>;
export default DashboardUpdateJobPage;
