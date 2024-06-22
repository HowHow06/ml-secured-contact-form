import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

export function validateBody<T extends object>(validationDto: { new (): T }) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const object = plainToClass(validationDto, req.body);
    const errors = await validate(object);

    if (errors.length > 0) {
      res.status(400).json({
        message: 'Validation failed',
        errors: errors.map(error => ({
          property: error.property,
          constraints: error.constraints,
        })),
      });
    } else {
      req.body = object;
      next();
    }
  };
}
