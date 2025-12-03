interface B2UploadUrlResponse {
    uploadUrl: string;
    authorizationToken: string;
    bucketId: string;
};

interface B2UploadFileResponse {
    fileId: string;
    fileName: string;
    accountId: string;
    bucketId: string;
    contentLength: number;
    contentSha1: string;
    contentType: string;
    uploadTimestamp: number;
};

interface UploadImageResponse {
    imageUrl: string,
    imageFileName: string,
    imageFileId: string
}

export {
    type B2UploadUrlResponse,
    type B2UploadFileResponse,
    type UploadImageResponse
}