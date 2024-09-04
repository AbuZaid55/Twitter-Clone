import { S3Client } from "@aws-sdk/client-s3";

const AWS_REGION = process.env.AWS_REGION

export const s3Client = new S3Client({
    region:AWS_REGION
})