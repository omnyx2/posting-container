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
import PostEntity from 'src/entity/post.entity';

@ApiTags('cats')
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
  @Get(':id')
  //@UserGaurd() 그리고 권한이 있는지를 확인
  getPost(@Param() params, @Res() res){
      try {
          const { id } = params.id
          return id

      
      } catch(e) {
        console.log(e)
        res.status(500).send({ error:e.message })
  }}
  
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
