import { IsNumber, IsString, IsNotEmpty } from 'class-validator';
import {
  ApiProperty
} from '@nestjs/swagger';

export class GetPaginatedPostParamDto {
  
  @IsNumber()
  @ApiProperty()
  page: number;

  @IsNumber()
  @ApiProperty()
  count: number;

  constructor(page: number, count: number) {
    this.page = page;
    this.count = count;
  }
}

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  body: string;

  @IsString()
  @ApiProperty()
  sub: string;

  constructor(title: string, body: string, sub: string) {
    this.title = title;
    this.body = body;
    this.sub = sub;
  }

}

export class FindPostDto {
  
  @IsString()
  title: string;

}


export class GetPostParamDto {
  @IsString()
  identifier: string;

  @IsString()
  slug: string;

  constructor(identifier: string, slug: string) {
    this.identifier = identifier;
    this.slug = slug;
  }
}

