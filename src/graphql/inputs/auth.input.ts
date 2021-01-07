import { IsEmail } from 'class-validator';
import { InputType, Field } from 'type-graphql';

@InputType()
export class AuthInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  password: string;
}
