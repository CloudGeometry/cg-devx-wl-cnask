import { useNotistack } from '@cnask/shared/feature';
import {
  useGetUploadUrlLazyQuery,
  useUpdateProfileMutation
} from '@cnask/utils/api-client';
import { Button, CircularProgress } from '@mui/material';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export function ImageUpload({ userId }: { userId: string }) {
  const { showErrorNotification, showSuccessNotification } = useNotistack();
  const [getUrl] = useGetUploadUrlLazyQuery({
    onError(e) {
      showErrorNotification(e);
    }
  });
  const [updateProfile] = useUpdateProfileMutation({
    onError(e) {
      showErrorNotification(e);
    },
    onCompleted() {
      showSuccessNotification('User photo successfully updated');
    },
    refetchQueries: ['Me']
  });

  const [loading, setLoading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const [file] = acceptedFiles;

      const imageFormat = file.type.split('/')?.[1];

      try {
        setLoading(true);
        const url = await getUrl({
          variables: {
            imageFormat
          }
        });

        if (url.data?.getUploadUrl) {
          const response = await fetch(url.data.getUploadUrl, {
            body: file,
            mode: 'cors',
            method: 'PUT',
            headers: {
              'Content-Length': new Blob([file]).size.toString()
            }
          });

          if (response.ok) {
            const urlObj = new URL(url.data.getUploadUrl);

            await updateProfile({
              variables: {
                id: userId,
                data: {
                  photo: urlObj.origin + urlObj.pathname
                }
              }
            });
          }
        }
      } catch (e) {
        if (e instanceof Error) {
          showErrorNotification(e);
        }

        console.error(e);
      } finally {
        setLoading(false);
      }
    },
    [getUrl, showErrorNotification, updateProfile, userId]
  );

  const { getRootProps, getInputProps, open } = useDropzone({
    noClick: true,
    noKeyboard: true,
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': []
    },
    multiple: false
  });

  return (
    <div {...getRootProps()}>
      <input
        {...getInputProps()}
        multiple={false}
      />

      {loading ? (
        <CircularProgress />
      ) : (
        <Button
          type='button'
          onClick={open}
          variant='outlined'
        >
          Upload file
        </Button>
      )}
    </div>
  );
}
