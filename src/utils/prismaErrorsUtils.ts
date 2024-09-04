import { number } from 'zod';
import { Response } from '../models/clan';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
interface ErrorMeta {
  column_name?: string;
  model_name?: string;
  argument_name?: string;
  argument_value?: string;
  constraint?: string;
  field_name?: string;
  field_value?: string;
  database_error?: string;
  query_parsing_error?: string;
  query_validation_error?: string;
  query_position?: string;
  code?: string;
  message?: string;
  path?: string;
  object_name?: string;
  relation_name?: string;
  model_a_name?: string;
  model_b_name?: string;
  details?: string;
  feature?: string;
  errors?: string[];
  timeout?: number;
  connection_limit?: number;
}

export interface PrismaError extends Error {
  code: string;
  meta?: ErrorMeta;
}

export function handlePrismaError(error: PrismaError): {
  code: number;
  message: string;
} {
  if (error instanceof PrismaClientKnownRequestError) {
    console.log(error, 'erros');
    switch (error.code) {
      case 'P2000':
        return {
          code: 400,
          message:
            `The provided value for the column is too long for the column's type. Column: ` +
            (error.meta?.column_name || 'Unknown column'),
        };
      case 'P2001':
        return {
          code: 404,
          message:
            `The record searched for in the where condition (` +
            (error.meta?.model_name || 'Unknown model') +
            `.` +
            (error.meta?.argument_name || 'Unknown argument') +
            ` = ` +
            (error.meta?.argument_value || 'Unknown value') +
            `) does not exist`,
        };
      case 'P2002':
        return {
          code: 409,
          message:
            `Unique constraint failed on the ` +
            (error.meta?.constraint || 'Unknown constraint'),
        };
      case 'P2003':
        return {
          code: 400,
          message:
            `Foreign key constraint failed on the field: ` +
            (error.meta?.field_name || 'Unknown field'),
        };
      case 'P2004':
        return {
          code: 400,
          message:
            `A constraint failed on the database: ` +
            (error.meta?.database_error || 'Unknown error'),
        };
      case 'P2005':
        return {
          code: 400,
          message:
            `The value ` +
            (error.meta?.field_value || 'Unknown value') +
            ` stored in the database for the field ` +
            (error.meta?.field_name || 'Unknown field') +
            ` is invalid for the field's type`,
        };
      case 'P2006':
        return {
          code: 400,
          message:
            `The provided value ` +
            (error.meta?.field_value || 'Unknown value') +
            ` for ` +
            (error.meta?.model_name || 'Unknown model') +
            ` field ` +
            (error.meta?.field_name || 'Unknown field') +
            ` is not valid`,
        };
      case 'P2007':
        return {
          code: 400,
          message:
            `Data validation error ` +
            (error.meta?.database_error || 'Unknown error'),
        };
      case 'P2008':
        return {
          code: 400,
          message:
            `Failed to parse the query ` +
            (error.meta?.query_parsing_error || 'Unknown error') +
            ` at ` +
            (error.meta?.query_position || 'Unknown position'),
        };
      case 'P2009':
        return {
          code: 400,
          message:
            `Failed to validate the query: ` +
            (error.meta?.query_validation_error || 'Unknown error') +
            ` at ` +
            (error.meta?.query_position || 'Unknown position'),
        };
      case 'P2010':
        return {
          code: 400,
          message:
            `Raw query failed. Code: ` +
            (error.meta?.code || 'Unknown code') +
            `. Message: ` +
            (error.meta?.message || 'Unknown message'),
        };
      case 'P2011':
        return {
          code: 400,
          message:
            `Null constraint violation on the ` +
            (error.meta?.constraint || 'Unknown constraint'),
        };
      case 'P2012':
        return {
          code: 400,
          message:
            `Missing a required value at ` +
            (error.meta?.path || 'Unknown path'),
        };
      case 'P2013':
        return {
          code: 400,
          message:
            `Missing the required argument ` +
            (error.meta?.argument_name || 'Unknown argument') +
            ` for field ` +
            (error.meta?.field_name || 'Unknown field') +
            ` on ` +
            (error.meta?.object_name || 'Unknown object') +
            `.`,
        };
      case 'P2014':
        return {
          code: 400,
          message:
            `The change you are trying to make would violate the required relation '` +
            (error.meta?.relation_name || 'Unknown relation') +
            `' between the ` +
            (error.meta?.model_a_name || 'Unknown model A') +
            ` and ` +
            (error.meta?.model_b_name || 'Unknown model B') +
            ` models.`,
        };
      case 'P2015':
        return {
          code: 404,
          message:
            `A related record could not be found. ` +
            (error.meta?.details || 'Unknown details'),
        };
      case 'P2016':
        return {
          code: 400,
          message:
            `Query interpretation error. ` +
            (error.meta?.details || 'Unknown details'),
        };
      case 'P2017':
        return {
          code: 400,
          message:
            `The records for relation ` +
            (error.meta?.relation_name || 'Unknown relation') +
            ` between the ` +
            (error.meta?.parent_name || 'Unknown parent') +
            ` and ` +
            (error.meta?.child_name || 'Unknown child') +
            ` models are not connected.`,
        };
      case 'P2018':
        return {
          code: 400,
          message:
            `The required connected records were not found. ` +
            (error.meta?.details || 'Unknown details'),
        };
      case 'P2019':
        return {
          code: 400,
          message: `Input error. ` + (error.meta?.details || 'Unknown details'),
        };
      case 'P2020':
        return {
          code: 400,
          message:
            `Value out of range for the type. ` +
            (error.meta?.details || 'Unknown details'),
        };
      case 'P2021':
        return {
          code: 400,
          message:
            `The table ` +
            (error.meta?.table || 'Unknown table') +
            ` does not exist in the current database.`,
        };
      case 'P2022':
        return {
          code: 400,
          message:
            `The column ` +
            (error.meta?.column || 'Unknown column') +
            ` does not exist in the current database.`,
        };
      case 'P2023':
        return {
          code: 400,
          message:
            `Inconsistent column data: ` +
            (error.meta?.message || 'Unknown message'),
        };
      case 'P2024':
        return {
          code: 503,
          message:
            `Timed out fetching a new connection from the connection pool. (More info: http://pris.ly/d/connection-pool (Current connection pool timeout: ` +
            (error.meta?.timeout || 'Unknown timeout') +
            `, connection limit: ` +
            (error.meta?.connection_limit || 'Unknown limit') +
            `))`,
        };
      case 'P2025':
        return {
          code: 400,
          message:
            `An operation failed because it depends on one or more records that were required but not found. ` +
            (error.meta?.cause || 'Unknown cause'),
        };
      case 'P2026':
        return {
          code: 400,
          message:
            `The current database provider doesn't support a feature that the query used: ` +
            (error.meta?.feature || 'Unknown feature'),
        };
      case 'P2027':
        return {
          code: 400,
          message:
            `Multiple errors occurred on the database during query execution: ` +
            (error.meta?.errors || 'Unknown errors'),
        };
      default:
        return {
          code: 500,
          message: 'An unknown error occurred.',
        };
    }
  }
  return {
    message: error.message,
    code: 500,
  };
}
