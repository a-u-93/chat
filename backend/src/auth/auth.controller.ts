import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Res,
  Req,
  Request
} from '@nestjs/common';
import * as express from "express"
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, string>, @Res() response: express.Response) {
    const tokenDTO = this.authService.signIn(signInDto.username, signInDto.password).then(access_token => {
      if(process.env.ADDRESS === '10.7.0.1') {
        response.cookie('token', access_token, {
          signed: true,
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
        })
      }
      if(process.env.ADDRESS !== '10.7.0.1') {
        response.cookie('token', access_token, {
          signed: true,
          httpOnly: true,
          secure: false,
          sameSite: 'strict',
        })
      }
      response.json(access_token)
    });
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('set-cookie')
  setCookie(@Res({ passthrough: true }) response: express.Response) {
    if(process.env.ADDRESS === '10.7.0.1') {
      response.cookie('key', 'value', {
        signed: true,
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      })
    }
    if(process.env.ADDRESS !== '10.7.0.1') {
      response.cookie('key', 'value', {
        signed: true,
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
      })
    }
  }

  @Get('get-cookie')
  getCookie(@Req() request: express.Request) {
    console.log(request.signedCookies['key'])
  }
}

