import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class CreateUserResponse extends PartialType(CreateUserDto) {

    readonly id:string;
}
