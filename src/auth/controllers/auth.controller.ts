import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserProfileDto } from '@users/dtos/users.dto';
import { AuthService } from '../services/auth.service';
import { RegisterDto, LoginDto } from '../dtos/auth.dto';
import { LocalAuthGuard } from '../guards/local-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiBody({
    type: LoginDto,
  })
  @ApiResponse({
    status: 201,
    description:
      'Login successfully and returned access token (and refresh token, if nothing changed)',
    schema: {
      properties: {
        accessToken: {
          type: 'string',
        },
      },
    },
  })
  async login(@Request() request) {
    return this.authService.login(request.user);
  }

  @Post('register')
  @ApiResponse({
    status: 201,
    description:
      'Registered successfully! New user is created and profile is returned',
    type: UserProfileDto,
  })
  async register(@Body() userDto: RegisterDto): Promise<UserProfileDto> {
    return this.authService.register(userDto);
  }
}
