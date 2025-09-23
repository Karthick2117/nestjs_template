import { Expose, Type as TransformType } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    description: 'Resource identifier',
    example: '650e1a7c9f1b4f1234567890',
  })
  @Expose()
  id!: string;

  @ApiProperty({ example: 'Alice Martin' })
  @Expose()
  name!: string;

  @ApiProperty({ example: 'alice@example.com', format: 'email' })
  @Expose()
  email!: string;

  @ApiProperty({ required: false, example: 'Coffee lover and JS dev' })
  @Expose()
  bio?: string;

  @ApiProperty({ description: 'Creation timestamp', format: 'date-time' })
  @Expose()
  @TransformType(() => Date)
  createdAt?: Date;

  @ApiProperty({ description: 'Last update timestamp', format: 'date-time' })
  @Expose()
  @TransformType(() => Date)
  updatedAt?: Date;
}
