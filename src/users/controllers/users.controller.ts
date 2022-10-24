import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '@auth/types/auth.types';
import { Authorized, RequestUser } from '@auth/decorators/auth.decorator';
import { UserProfileDto } from '../dtos/users.dto';
import { UsersService } from '../services/users.service';

@ApiTags('users')
@Authorized()
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('profile')
  @ApiResponse({
    status: 200,
    description:
      'Current logged in user, based on `Authorization: Bearer <JWT>` header.',
    type: UserProfileDto,
  })
  getProfile(@RequestUser() { userId }: CurrentUser): Promise<UserProfileDto> {
    const user = this.usersService.getProfile(userId);
    return user;
  }
}
