import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsUrl, Matches } from 'class-validator';
import { ERROR_MESSAGE } from '../../common/constants/error.constants';
import { LOCALE_REGEX } from '../../common/utils/regex_format';
import { isPhoneNumber } from '../../common/utils/custom_validation_decorators';

const LOCALE_VALIDATION_ERROR = ERROR_MESSAGE.LOCALE_VALIDATION_ERROR;

@InputType()
export class UpdateProfileInput {
  @Field({ nullable: true })
  firstname?: string;

  @Field({ nullable: true })
  lastname?: string;

  @Field({ nullable: true })
  email?: string;

  @IsOptional()
  @Matches(LOCALE_REGEX, {
    message: LOCALE_VALIDATION_ERROR
  })
  @Field(() => String, { nullable: true })
  locale?: string;

  @IsOptional()
  @isPhoneNumber()
  @Field({ nullable: true })
  phoneNumber?: string;

  @IsUrl()
  @IsOptional()
  @Field(() => String, { nullable: true })
  photo?: string | null;
}
