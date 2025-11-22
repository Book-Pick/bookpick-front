import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import { uploadImage, type ImageType } from '@/shared/api/imageUpload.api'

interface UploadImageParams {
  file: File
  type?: ImageType
}

type UseImageUploadOptions = Omit<
  UseMutationOptions<string, Error, UploadImageParams>,
  'mutationFn' | 'mutationKey'
>

export const useImageUpload = (options?: UseImageUploadOptions) => {
  return useMutation<string, Error, UploadImageParams>({
    mutationKey: ['uploadImage'],
    mutationFn: ({ file, type }) => uploadImage(file, type),
    ...options,
  })
}
