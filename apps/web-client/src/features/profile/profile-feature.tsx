import { useAuth } from '../auth';
import { PasswordForm } from './ui/password-form/password-form';
import { ProfileForm } from './ui/profile-form/profile-form';
import { useNotistack } from '@cnask/shared/feature';
import {
  ChangePasswordInput,
  UpdateProfileInput,
  useChangePasswordMutation,
  useUpdateProfileMutation
} from '@cnask/utils/api-client';
import { Grid } from '@mui/material';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { UserPhoto } from './user-photo';

export function ProfileFeature() {
  const { user } = useAuth();

  const { t } = useTranslation();

  const { enchanceRequestWithNotistack } = useNotistack();

  const [onProfileUpdate, profileData] = useUpdateProfileMutation({
    ...enchanceRequestWithNotistack({
      successMessage: t('features.profile.profileUpdated')
    })
  });

  const [onPasswordChange, passwordData] = useChangePasswordMutation({
    ...enchanceRequestWithNotistack({
      successMessage: t('features.profile.passwordChanged')
    })
  });

  const onProfileUpdateHandler = useCallback(
    async (values: UpdateProfileInput) => {
      await onProfileUpdate({
        variables: { data: values, id: user?.id as string }
      });
    },
    [onProfileUpdate, user?.id]
  );

  const onPasswordChangeHandler = useCallback(
    async (values: ChangePasswordInput) => {
      await onPasswordChange({ variables: { data: values } });
    },
    [onPasswordChange]
  );

  return (
    <>
      <h1>{t('features.profile.title')}</h1>

      <Grid
        container
        spacing={2}
      >
        <Grid
          item
          xs={12}
          md={4}
        >
          <UserPhoto user={user} />
        </Grid>

        <Grid
          item
          xs={12}
          md={4}
        >
          <PasswordForm
            onSubmit={onPasswordChangeHandler}
            loading={passwordData.loading}
            error={passwordData.error}
          />
        </Grid>

        <Grid
          item
          xs={12}
          md={4}
        >
          <ProfileForm
            user={user}
            onSubmit={onProfileUpdateHandler}
            loading={profileData.loading}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default ProfileFeature;
