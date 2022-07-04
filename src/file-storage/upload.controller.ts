import { Body, Controller, Post, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UploadService } from './upload.service';
import { FastifyRequest, FastifyReply } from 'fastify';
import { FileInterceptor } from '@nestjs/platform-express';
import { FastifyFileInterceptor } from 'src/common/interceptors/fastifySingleFile.interceptor';
import { diskStorage } from 'multer';
import { editFileName } from 'src/common/utils/file-upload-util';
import { DeleteObject } from './dto/deleteObject.dto';

@Controller('filestorage')
export class UploadController {
  constructor(private readonly uploadService: UploadService) { }

  @Post('/upload-single-file')
  @UseInterceptors(FastifyFileInterceptor('file', {
    storage: diskStorage({
      destination: './upload/single',
      filename: editFileName,
    }),
    // fileFilter: imageFileFilter,
  }))
  async create(@Req() request: FastifyRequest, @Res() response: FastifyReply, @UploadedFile() file: Express.Multer.File) {
    try {
      // console.log(file)
      const s3_file: any = await this.uploadService.fileupload(request, response, file);
      if (s3_file.Location)
        return response.status(201).send(s3_file)
    } catch (error) {
      return response
        .status(500)
        .send(`Failed to upload image file: ${error.message}`);
    }
  }

  @Post('/delete-file')
  
  async deleteS3Object(@Req() req: FastifyRequest, @Res() res: FastifyReply, @Body() deleteObject: DeleteObject) {
    try {
      const del_Obj = await this.uploadService._deleteHandler(deleteObject.filename)
      if (!del_Obj) {
        return res.status(200).send('There was an error deleting file')
      }
      console.log(del_Obj);
      return res.status(200).send(del_Obj)
    } catch (error) {
      return res
        .status(500)
        .send(`Failed to upload image file: ${error.message}`);
    }
  }
}