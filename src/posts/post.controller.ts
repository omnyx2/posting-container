import {
  Body,
  Req,
  Res,
  Put,
  Delete,
  Controller,
  Get, Param,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import { Response } from 'express';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiProperty,
  ApiBody,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CreatePostDto, GetPaginatedPostParamDto } from './post.dto';
import { GetPostParamDto } from '../comments/comments.dto';
import PostEntity from 'src/entity/post.entity';

@ApiTags('posts')
@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Get('/')
  @ApiOperation({ summary: 'Get Post List' })
  @ApiBody({type: GetPaginatedPostParamDto})
  @ApiResponse({ status: 403, description: 'Forbidden' })
  //@UseGuard(JwtAuthGuard)
  getPosts(
    @Query() post: GetPaginatedPostParamDto,
   // @GetUser() user: UserEntity,
  ) {
    return this.postService.getPosts(post);//, user);
  }

  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: PostEntity,
  })
  @Get('/:identifier/:slug')
  //@UseGuards(JwtAuthGuard)
  async getPost(@Param() getPostParam: GetPostParamDto) {//, @GetUser() user: UserEntity) {
      const post = await this.postService.getPost(getPostParam)//, user);
      console.log(post)
      return post
  }

  
  @Post()
  @ApiBody({type: CreatePostDto})
  //@UseGuard(AuthGuard())
  createOne(
    @Body() createPost: CreatePostDto,
      //  @Body(ValidationPipe) createPost: CreatePostDto
    //
  ) {
   return this.postService.createPost(createPost); 
  }

  @Put('/:identifier/:slug')
  //@UserGaurd()
  updateOne(
    @Body() createPost: CreatePostDto,
    @Param() params) {
    return `update ${params.id}`
  }

  @Delete('/:identifier/:slug')
  //@UserGaurd()
  deleteOne() {
    return 'del';
  }

}
