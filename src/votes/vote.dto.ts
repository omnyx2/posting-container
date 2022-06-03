import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VoteDto {
  
  @IsString()
  @ApiProperty()
  identifier: string;


  @IsString()
  @ApiProperty()
  slug: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  commentIdentifier: string;

  @IsNumber()
  @ApiProperty()
  value: number;

  constructor(
    identifier: string,
    slug: string,
    commentIdentifier: string,
    value: number,
  ) {
    this.identifier = identifier;
    this.slug = slug;
    this.commentIdentifier = commentIdentifier;
    this.value = value;
  }
}

