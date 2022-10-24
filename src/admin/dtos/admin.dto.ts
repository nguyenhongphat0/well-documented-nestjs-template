import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AdminLoginDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class AdminRegisterDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiPropertyOptional()
  fullname: string;
}
