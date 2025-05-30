// src/aws-s3/aws-s3.service.ts
import { Injectable } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { randomUUID } from 'crypto';

@Injectable()
export class AwsS3Service {
  private s3: S3Client;

  constructor() {
    const region = process.env.AWS_REGION;
    const accessKeyId = process.env.AWS_ACCESS_KEY; // <-- Use standard AWS var names
    const secretAccessKey = process.env.AWS_SECRET_KEY;

    if (!region || !accessKeyId || !secretAccessKey) {
      throw new Error(
        'Missing required AWS environment variables: AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY',
      );
    }

    this.s3 = new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const bucket = process.env.AWS_BUCKET;
    if (!bucket) throw new Error('AWS_BUCKET env variable is missing');

    const key = `${Date.now()}-${randomUUID()}-${file.originalname}`;
    await this.s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
        // ACL: 'public-read', // Make file publicly accessible
      }),
    );
    return `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
  }

  async deleteFileByUrl(fileUrl: string): Promise<void> {
    const bucket = process.env.AWS_BUCKET;
    if (!bucket) throw new Error('AWS_BUCKET env variable is missing');

    // Extract key from URL
    // Example URL: https://bucket.s3.region.amazonaws.com/path/to/file.jpg
    // This regex gets everything after the first ".amazonaws.com/"
    const match = fileUrl.match(/\.amazonaws\.com\/(.+)$/);
    if (!match || !match[1]) {
      throw new Error('Invalid S3 file URL');
    }
    const key = decodeURIComponent(match[1]);

    await this.s3.send(
      new DeleteObjectCommand({
        Bucket: bucket,
        Key: key,
      }),
    );
  }
}
