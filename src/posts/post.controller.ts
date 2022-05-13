import {
  Body,
  Req,
  Res,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { PostService } from './post.service';


@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Get('/')
  //@UseGuard(JwtAuthGuard)
  findAll(@Req() req: Request ): string {
    return 'This action returns posts list';
  }
  
  @Get(':id')
  findOne(@Req() req: Request){
      try {
          const { id } = req.params
          const user_id = req.user ? req.user.id: -1
          return 'post'
      
      } catch(e) {
        res.status(500).send({ error:e.message })
  }}
  
  @Post()
  //@UseGuard(AuthGuard())
  createOne(
    @Body(ValidationPipe) createPost: CreatePostDto,
      //  @Body(ValidationPipe) createPost: CreatePostDto
  ) {

    return 'none'
  }


  @Put(':id')
  updateOne(@Req req: Request) {
    return `update${id}`
  }

  @Delete
  deleteOne(@Req req: Request) {
    return 'del';
  }

}
