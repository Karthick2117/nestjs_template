import { BadRequestException, PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';

export class ParseObjectIdPipe implements PipeTransform<string, string> {
  transform(value: string): string {
    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException('Invalid ObjectId format');
    }
    return value;
  }
}
