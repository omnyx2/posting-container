import { 
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param
} from '@nestjs/common';
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
  //  @GetUser() user: UserEntity,
  ) {
    return this.commentService.commentOnPost(getPostParam, body.body);//, user, body.body);
  }

  @Get('/:identifier/:slug')
  // @UseGuards(JwtAuthGuard)
  getPostComments(
    @Param() getPostParam: GetPostParamDto,
  // @GetUser() user: UserEntity,
  ) {
    return this.commentService.getPostComments(getPostParam)//, user);
  }
}
