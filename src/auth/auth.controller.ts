import {
  Controller,
  Post,
  Get,
  Body,
  HttpCode,
  HttpStatus,
  Res,
  Req,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { AuthService } from './auth.service'
import { AuthDTO } from './DTO/auth.dto'
import { Csrf, Msg } from './interfaces/auth.interfaces'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() dto: AuthDTO): Promise<Msg> {
    return this.authService.signUp(dto)
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() dto: AuthDTO,
    @Res({ passthrough: true }) res: Response
  ): Promise<Msg> {
    const jwt = await this.authService.login(dto)
    res.cookie('access_token', jwt.accessToken, {
      httpOnly: true,
      secure: false, //NOTE:Postman動作確認のためにfalseにしてる
      sameSite: 'none',
      path: '/',
    })
    return {
      message: 'ok',
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ): Promise<Msg> {
    res.cookie('access_token', '', {
      httpOnly: true,
      secure: false, //NOTE:Postman動作確認のためにfalseにしてる
      sameSite: 'none',
      path: '/',
    })
    return {
      message: 'ok',
    }
  }
}
// user2@test.com
// user2test
