import { ValidationOptions, registerDecorator } from 'class-validator';
import { validateNRICDate } from 'src/utils/helpers';
import validator from 'validator';

export function IsNRIC(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isNRIC',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: string) {
          return (
            typeof value === 'string' &&
            validator.isNumeric(value) &&
            value.length === 12 &&
            validateNRICDate(value)
          );
        },
        defaultMessage() {
          return 'Invalid NRIC.';
        },
      },
    });
  };
}
