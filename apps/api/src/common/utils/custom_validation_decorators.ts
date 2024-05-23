import { registerDecorator } from 'class-validator';
import { ERROR_MESSAGE } from '../constants/error.constants';

const PHONE_NUMBER_IS_NOT_VALID = ERROR_MESSAGE.PHONE_NUMBER_IS_NOT_VALID;

export function isPhoneNumber() {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isPhoneNumber',
      target: object.constructor,
      propertyName: propertyName,
      options: { message: PHONE_NUMBER_IS_NOT_VALID },
      validator: {
        validate(value: any) {
          return (
            typeof value === 'string' &&
            /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im.test(
              value
            )
          );
        }
      }
    });
  };
}
