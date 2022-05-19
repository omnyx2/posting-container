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
import { CreatePostDto, GetPaginatedPostParamDto } from './post.dto';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Get('/')
  //@UseGuard(JwtAuthGuard)
  getPosts(
    @Query() post: GetPaginatedPostParamDto,
   // @GetUser() user: UserEntity,
  ) {
    return this.postService.getPosts(post);//, user);
  }
  
  @Get(':id')
  //@UserGaurd() 그리고 권한이 있는지를 확인
  findOne(@Param() params, @Res() res){
      try {
          const { id } = params.id
          return id

      
      } catch(e) {
        console.log(e)
        res.status(500).send({ error:e.message })
  }}
  
  @Post()
  //@UseGuard(AuthGuard())
  createOne(
    @Body() createPost: CreatePostDto,
      //  @Body(ValidationPipe) createPost: CreatePostDto
    //
  ) {
   return this.postService.createPost(createPost); 
  }

  @Put(':id')
  //@UserGaurd()
  updateOne(
    @Body() createPost: CreatePostDto,
    @Param() params) {
    return `update ${params.id}`
  }

  @Delete(':id')
  //@UserGaurd()
  deleteOne() {
    return 'del';
  }
}
