import { Req, Res, Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { createReadStream } from 'fs';
import { rejects } from 'assert';



@Injectable()
export class UploadService {
    private readonly bucket: string
    private readonly prefix: string

    // AWS_S3_BUCKET_NAME
    constructor(private configService: ConfigService) {
        var AWS_S3_BUCKET_NAME = this.configService.get<string>('S3_BUCKET')
        AWS.config.update({
            accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
            secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
        });
        this.bucket = this.configService.get('S3_BUCKET')
    }
    s3 = new AWS.S3();

    async fileupload(@Req() req, @Res() res, file: Express.Multer.File) {
        return new Promise((resolve, reject) => {
            this._uploadHandler(req, file, function (error, info) {
                if (error) {
                    console.log(error);
                    // throw new Error(`Failed to upload image file: ${error}`);
                    reject(error)
                }
                console.log('info ===>>>', info)
                resolve(info);
            });
        })
    }

    _deleteHandler(req, key: string) {
        return new Promise((res, rej) => {
            this.s3.deleteObject({ Bucket: this.bucket, Key: key }, function (err, data) {
                if (err) { rej(err) }
                if (data) { res(data) }
                rej('something terrible happened')
            })

        })
    }

    _uploadHandler(@Req() req, file: Express.Multer.File, cb: (error: Error | null, info?: any) => void) {
        let progress = 0
        try {
            const params: AWS.S3.Types.PutObjectRequest = {
                Bucket: this.bucket,
                Key: `${this.prefix || ''}${file.filename}`,
                Body: createReadStream(file.path),
                ContentType: file.mimetype,
                ContentDisposition: 'inline',
            }

            const upload = this.s3.upload(params);

            upload.on('httpUploadProgress', (p) => {
                if (p.total) {
                    progress = (p.loaded / p.total) * 100
                }
                console.log('progress  ------->>>>>  ', progress)
            })

            upload.promise().then((data) => {
                cb(null, {
                    done: progress.toFixed(2),
                    ...data,
                })
            }, cb);
        } catch (error) {
            cb(error)
        }
    }

}