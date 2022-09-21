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
  async login(@Body() dto: AuthDTO, @Res({ passthrough: true }) res: Response) {
    const jwt = await this.authService.login(dto)
    res.cookie('access_token', jwt.accessToken, {
      httpOnly: true,
      secure: false, //NOTE:Postman動作確認のためにfalseにしてる
      sameSite: 'none',
      path: '/',
    })
    return {
      message: 'success',
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(
    @Body() dto: AuthDTO,
    @Res({ passthrough: true }) res: Response
  ) {
    const jwt = await this.authService.logout(dto)
    res.cookie('access_token', jwt.accessToken, {
      httpOnly: true,
      secure: false, //NOTE:Postman動作確認のためにfalseにしてる
      sameSite: 'none',
      path: '/',
    })
    return {
      message: 'success',
    }
  }
}
