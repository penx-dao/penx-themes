import { calculateSHA256FromFile } from './calculateSHA256FromFile'
import { IPFS_UPLOAD_URL, UPLOAD_PROVIDER, UploadProvider } from './constants'
import { uploadToGoogleDrive } from './uploadToGoogleDrive'

type UploadReturn = {
  contentDisposition?: string
  contentType?: string
  pathname?: string
  url?: string
  cid?: string
}

export async function uploadFile(
  file: File,
  isUploadToGoogleDrive: boolean = true,
) {
  const fileHash = await calculateSHA256FromFile(file)
  let data: UploadReturn = {}
  if (UPLOAD_PROVIDER === UploadProvider.VERCEL_BLOB) {
    data = await fetch(`/api/upload?fileHash=${fileHash}`, {
      method: 'POST',
      body: file,
    }).then((res) => res.json())
    return data as UploadReturn
  } else {
    // ipfs
    const res = await fetch(IPFS_UPLOAD_URL, {
      method: 'POST',
      body: file,
    })

    if (res.ok) {
      data = await res.json()
    } else {
      throw new Error('Failed to upload file')
    }
  }

  if (isUploadToGoogleDrive) {
    setTimeout(async () => {
      try {
        await uploadToGoogleDrive(fileHash, file)
      } catch (error) {
        console.log('error uploading to Google Drive:', error)
      }
    }, 0)
  }

  return data as UploadReturn
}