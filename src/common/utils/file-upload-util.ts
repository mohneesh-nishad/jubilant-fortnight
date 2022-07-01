import { Request } from 'express';
import { extname } from 'path';

export const editFileName = (
  req: Request,
  file: Express.Multer.File,
  callback
) => {
  const index = file.originalname.lastIndexOf('.');
  const name = file.originalname.slice(0, index)
  // const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  callback(null, `${name}-${+new Date()}${fileExtName}`);
};

export const imageFileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback
) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};