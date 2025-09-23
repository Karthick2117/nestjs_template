import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

class DataEnvelope {}

class ListEnvelope {}

export const ApiOkResponseData = <TModel extends Type<unknown>>(
  model: TModel,
) =>
  applyDecorators(
    ApiExtraModels(DataEnvelope, model),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(DataEnvelope) },
          {
            properties: {
              data: { $ref: getSchemaPath(model) },
            },
            required: ['data'],
          },
        ],
      },
    }),
  );

export const ApiOkResponseList = <TModel extends Type<unknown>>(
  model: TModel,
) =>
  applyDecorators(
    ApiExtraModels(ListEnvelope, model),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ListEnvelope) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
              total: { type: 'number', example: 42 },
            },
            required: ['data', 'total'],
          },
        ],
      },
    }),
  );
