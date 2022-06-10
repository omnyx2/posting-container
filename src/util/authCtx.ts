import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import UserEntity from 'src/entity/user.entity'

export const GetUser = createParamDecorator(
  (_, ctx: ExecutionContext): UserEntity => {
    const req = ctx.switchToHttp().getRequest()
    const userTemp: Partial<UserEntity> = {
      email: 'omnyx2@gmail.com',
      username: 'superuser',
    }
    req.user = userTemp
    return req.user
  }
)
