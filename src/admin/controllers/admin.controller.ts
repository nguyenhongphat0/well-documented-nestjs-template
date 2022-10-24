import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Post,
  Query,
  Redirect,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiExcludeEndpoint,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '@users/entities/user.entity';
import { UsersService } from '@users/services/users.service';
import { AdminJwtAuthGuard } from '../guards/admin-jwt-auth.guard';
import { AdminLocalAuthGuard } from '../guards/admin-local-auth.guard';
import { AdminLoginDto, AdminRegisterDto } from '../dtos/admin.dto';
import { AdminService } from '../services/admin.service';
import { Pagination } from 'nestjs-typeorm-paginate';
@ApiBearerAuth()
@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(
    private adminService: AdminService,
    private userService: UsersService,
  ) {}

  @Redirect('/admin/api')
  @Get()
  @ApiExcludeEndpoint()
  index() {}

  @Post('login')
  @UseGuards(AdminLocalAuthGuard)
  @ApiBody({
    type: AdminLoginDto,
  })
  async login(@Request() request) {
    return this.adminService.login(request.user);
  }

  @Post('register')
  async register(@Body() admin: AdminRegisterDto) {
    return this.adminService.create(admin);
  }

  @Get('profile')
  @UseGuards(AdminJwtAuthGuard)
  async profile(@Request() request) {
    return request.user;
  }

  @Get('users')
  @UseGuards(AdminJwtAuthGuard)
  async users(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<Pagination<User>> {
    limit = limit > 100 ? 100 : limit;
    return this.userService.paginate({
      page,
      limit,
      route: '/admin/users',
    });
  }
}
