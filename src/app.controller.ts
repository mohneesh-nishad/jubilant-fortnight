import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get(':id')
  findOne(@Param('id') id: string): object | string {
    return this.appService.getSingleUser(+id)
  }

  @Post('webhook')
  webhooks(@Body() body: any, @Res() res: any) {
    // console.log(body);
    const raw = JSON.parse(body);
    const msg = JSON.parse(raw.Message)
    console.log(msg);
    return res.status(200).send('done');
  }
}
