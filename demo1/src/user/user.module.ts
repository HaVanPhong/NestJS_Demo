import { Module } from '@nestjs/common'
import { StoreModule } from 'src/store/store.module'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
  imports: [StoreModule.register({dir: "store", filename: "user.json"})],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule{

}