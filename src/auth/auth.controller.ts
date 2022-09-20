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
import { AuthService } from './auth/auth.service'
import { AuthDTO } from './auth/DTO/auth.dto'
import { Csrf, Msg } from './interfaces/auth.interfaces'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signup')
  signUp(@Body() dto: AuthDTO): Promise<Msg> {
    return this.authService.signUp(dto)
  }
}
