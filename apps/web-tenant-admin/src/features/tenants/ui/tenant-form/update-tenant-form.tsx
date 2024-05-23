import { SmartForm } from '@cnask/shared/feature';
import { FormInput, FormSelect, StyledLoadingButton } from '@cnask/shared/ui';
import { TenantStatus } from '@cnask/utils/api-tenant';
import { FieldValues } from 'react-hook-form';
export interface FormProps<T extends FieldValues> {
  loading: boolean;
  onSubmit: (data: T) => void;
  values: T;
}

export function UpdateTenantForm<T extends FieldValues>({
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
        autoComplete='text'
        type='text'
        label={'Config'}
        name='config'
      />

      <FormSelect
        name='status'
        options={[
          {
            name: 'New',
            value: TenantStatus.New
          },
          {
            name: 'Created',
            value: TenantStatus.Created
          },
          {
            name: 'Verified',
            value: TenantStatus.Verified
          }
        ]}
        label='Status'
      />

      <FormInput
        type='text'
        label={'Owner'}
        name='owner'
      />

      <StyledLoadingButton loading={loading}>Submit</StyledLoadingButton>
    </SmartForm>
  );
}
