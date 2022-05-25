import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class GetPostParamDto {
  @IsString()
  @ApiProperty()
  identifier: string;

  @IsString()
  @ApiProperty()
  slug: string;

  constructor(identifier: string, slug: string) {
    this.identifier = identifier;
    this.slug = slug;
  }
} 

export class CreateCommentParamDto {
  @IsString()
  @ApiProperty()
  body: string;
}
