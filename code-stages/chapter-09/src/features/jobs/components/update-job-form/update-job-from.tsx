import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';

import { InputField } from '@/components/form';

import { useUpdateJob } from '../../api/update-job';
import { Job, UpdateJobData } from '../../types';

export type UpdateJobFormProps = {
  job: Job;
  onSuccess: () => void;
};

export const UpdateJobForm = ({
  job,
  onSuccess,
}: UpdateJobFormProps) => {
  const updateJob = useUpdateJob({ onSuccess });
  const router = useRouter();

  const { register, handleSubmit, formState, control } =
    useForm<UpdateJobData>({
      defaultValues: { ...job },
    });

  const onSubmit = (data: UpdateJobData) => {
    updateJob.submit({ jobId: job.id, data });
  };
  return (
    <Box w="full">
      <Stack
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        w="full"
        spacing="8"
      >
        <InputField
          label="Position"
          {...register('position', {
            required: 'Required',
          })}
          error={formState.errors['position']}
        />
        <InputField
          label="Department"
          {...register('department', {
            required: 'Required',
          })}
          error={formState.errors['department']}
        />
        <InputField
          label="Location"
          {...register('location', {
            required: 'Required',
          })}
          error={formState.errors['location']}
        />
        <InputField
          type="textarea"
          label="Info"
          {...register('info', {
            required: 'Required',
          })}
          error={formState.errors['info']}
        />
        <FormControl>
          <FormLabel>Status</FormLabel>
          <Controller
            name="status"
            control={control}
            render={({ field: { onChange, value } }) => (
              <RadioGroup
                onChange={onChange}
                value={value}
                isDisabled={job.status === 'published'}
              >
                <Stack direction="row">
                  <Radio value="draft">Draft</Radio>
                  <Radio value="published">
                    Published
                  </Radio>
                </Stack>
              </RadioGroup>
            )}
          />
        </FormControl>
        <Stack w="full" direction="row" spacing="8">
          <Button
            bg="primary"
            color="primaryAccent"
            isDisabled={updateJob.isLoading}
            isLoading={updateJob.isLoading}
            type="submit"
            _hover={{
              opacity: 0.9,
            }}
          >
            Update
          </Button>
          <Button
            isDisabled={updateJob.isLoading}
            bg="orange"
            onClick={() =>
              router.push(`/dashboard/jobs/${job.id}`)
            }
          >
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};
