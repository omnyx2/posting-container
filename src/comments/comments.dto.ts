import { IsNotEmpty, IsString } from 'class-validator';

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
