import { IsEmail, IsOptional, Length, Matches } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { UserDoesNotExist } from '../validation/user-does-not-exist.constraint';
import { ERROR_MESSAGE } from '../../common/constants/error.constants';
import { LOCALE_REGEX } from '../../common/utils/regex_format';
import { isPhoneNumber } from '../../common/utils/custom_validation_decorators';

const LOCALE_VALIDATION_ERROR = ERROR_MESSAGE.LOCALE_VALIDATION_ERROR;

@InputType('UserAddInput')
export class CreateUserInput {
  @Length(5)
  @UserDoesNotExist()
  @Field()
  username: string;

  @Length(8)
  @Field()
  password: string;

  @Length(2)
  @Field()
  firstname: string;

  @Length(2)
  @Field()
  lastname: string;

  @IsOptional()
  @IsEmail()
  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  role: string;

  @IsOptional()
  @Matches(LOCALE_REGEX, {
    message: LOCALE_VALIDATION_ERROR
  })
  @Field({ nullable: true })
  locale?: string;

  @IsOptional()
  @isPhoneNumber()
  @Field({ nullable: true })
  phoneNumber?: string;

  @Field({ nullable: true })
  inviteId?: string;

  @Field({ nullable: true })
  tenantAlias?: string;
}
