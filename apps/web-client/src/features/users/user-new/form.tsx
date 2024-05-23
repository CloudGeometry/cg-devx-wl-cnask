import { SmartForm } from '@cnask/shared/feature';
import { FormInput, StyledLoadingButton } from '@cnask/shared/ui';
import { FieldValues } from 'react-hook-form';

export interface FormProps<T extends FieldValues> {
  loading: boolean;
  onSubmit: (data: T) => void;
  values: T;
}

export function UserNewFrom<T extends FieldValues>({
  onSubmit,
  values,
  loading
}: FormProps<T>) {
  return (
    <SmartForm<T>
      onSubmit={onSubmit}
      values={values}
    >
      <FormInput
        autoComplete='email'
        type='text'
        label={'Email'}
        name='email'
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'invalid email address'
          }
        }}
      />

      <StyledLoadingButton loading={loading}>Submit</StyledLoadingButton>
    </SmartForm>
  );
}