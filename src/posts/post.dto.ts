import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class GetPaginatedPostParamDto {
  @IsNumber()
  page: number;

  @IsNumber()
  count: number;

  constructor(page: number, count: number) {
    this.page = page;
    this.count = count;
  }
}

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  body: string;

  @IsString()
  sub: string;

  constructor(title: string, body: string, sub: string) {
    this.title = title;
    this.body = body;
    this.sub = sub;
  }

}

