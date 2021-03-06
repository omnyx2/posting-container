import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common'
// import { AuthGuard } from '@nestjs/passport';
// import { GetUser } from 'src/auth/get-user.decorator';
// import UserEntity from 'src/entities/user/user.entity';
import { VoteDto } from './vote.dto'
import { VoteService } from './vote.service'
import {
  ApiBearerAuth,
  ApiOperation,
  ApiProperty,
  ApiBody,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { GetUser } from 'src/util/authCtx'
import UserEntity from 'src/entity/user.entity'

@ApiTags('vote')
@Controller('api/vote')
export class VoteController {
  constructor(private voteService: VoteService) {}

  @Post('/')
  // @UseGuards(AuthGuard())
  vote(@Body(ValidationPipe) voting: VoteDto, @GetUser() user: UserEntity) {
    console.log(voting)
    return this.voteService.vote(voting, user) //, user);
  }
}
