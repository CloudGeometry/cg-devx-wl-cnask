import {
  FormAutocomplete,
  FormDatePicker,
  FormInput,
  StyledLoadingButton
} from '@cnask/shared/ui';
import { FieldValues } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { SmartForm } from '@cnask/shared/feature';

export interface TodoFormProps<T extends FieldValues> {
  loading: boolean;
  onSubmit: (data: T) => void;
  values: T;
}

export function TodoForm<T extends FieldValues>({
  loading,
  onSubmit,
  values
}: TodoFormProps<T>) {
  const { t } = useTranslation();

  return (
    <SmartForm<T>
      onSubmit={onSubmit}
      values={values}
    >
      <FormInput
        autoComplete='text'
        type='text'
        label={t('features.todo.form.title')}
        name='title'
        rules={{ required: 'Title is required' }}
      />

      <FormInput
        autoComplete='text'
        type='text'
        label={t('features.todo.form.description')}
        name='description'
        rules={{ required: 'Description is required' }}
        multiline
      />

      <FormDatePicker
        label={t('features.todo.form.dueDate')}
        name='dueDate'
        rules={{ required: 'Choose date' }}
      />

      <FormAutocomplete
        name='assigneeId'
        label={t('features.todo.form.assignee')}
        rules={{
          required: 'Assignee is required'
        }}
      />

      <FormInput
        autoComplete='text'
        type='text'
        label={t('features.todo.form.createdBy')}
        name='createdBy'
        disabled
        multiline
      />

      <StyledLoadingButton loading={loading}>
        {t('features.todo.form.submit')}
      </StyledLoadingButton>
    </SmartForm>
  );
}

export default TodoForm;
