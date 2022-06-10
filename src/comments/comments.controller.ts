import { 
  Controller,
  Post, Get,
  Delete,
  Body,
  Param } from '@nestjs/common';
import { 
  ApiBearerAuth,
  ApiOperation,
  ApiProperty,
  ApiBody,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { GetPostParamDto, CreateCommentParamDto } from './comments.dto';
import { CommentService } from './comments.service';

import UserEntity from 'src/entity/comment.entity';
import { GetUser } from 'src/util/authCtx';

@ApiTags('comments')
@Controller('comments')
export class CommentController {
  constructor(
    private commentService: CommentService
  ) {}
  @Post('/:identifier/:slug')
  @ApiBody({ type: CreateCommentParamDto })
  // @UseGuards(AuthGuard())
  commentOnPost(
    @Param() getPostParam: GetPostParamDto,
    @Body() body: { body: string },
    @GetUser() user: UserEntity,
  ) {
    this.commentService.commentOnPost(getPostParam,  body.body);
  }

  @Get('/:identifier/:slug')
  // @UseGuards(JwtAuthGuard)
  getPostComments(
    @Param() getPostParam: GetPostParamDto,
    @GetUser() user: UserEntity,
  ) {
    return null; //this.commentService.getPostComments(getPostParam, user);
  }
}
