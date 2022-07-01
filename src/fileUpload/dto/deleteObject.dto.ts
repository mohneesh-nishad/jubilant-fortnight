import { IsNotEmpty } from "class-validator";

export class DeleteObject {

  @IsNotEmpty()
  filename: string;
}