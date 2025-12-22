import "server-only";

import B2 from 'backblaze-b2';

import { B2UploadFileResponse, B2UploadUrlResponse, UploadImageResponse } from '@/types/b2-bucket.ts';

async function uploadImage(imgFile: File): Promise<UploadImageResponse> {
    const b2 = new B2({
        applicationKeyId: process.env.B2_KEY_ID!,
        applicationKey: process.env.B2_APP_KEY!
    });

    await b2.authorize();
    const uploadUrlRes = await b2.getUploadUrl({ bucketId: process.env.B2_BUCKET_ID! });
    const { uploadUrl, authorizationToken } = uploadUrlRes.data as B2UploadUrlResponse;
    const extension = imgFile.name.split('.').pop();
    const fName = `public/uploads/${crypto.randomUUID()}.${extension}`;
    const arrBuffer = await imgFile.arrayBuffer();
    const buffer = Buffer.from(arrBuffer);
    const uploadFileRes = await b2.uploadFile({
        uploadUrl,
        uploadAuthToken: authorizationToken,
        fileName: fName,
        data: buffer,
        mime: imgFile.type
    });
    const { fileName, fileId } = uploadFileRes.data as B2UploadFileResponse;
    const imageUrl = `${process.env.CDN_BASE_URL}/${fileName}`;
    return {
        imageUrl,
        imageFileName: fileName,
        imageFileId: fileId
    };
};

export {
    uploadImage
}