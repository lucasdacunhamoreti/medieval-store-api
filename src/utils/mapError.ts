import { IStatusCode } from '../interfaces/IStatusCode';

const statusCode: IStatusCode = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  UNPROCESSABLE: 422,
};

const mapError = (type: string): number => {
  const result = statusCode[type] || 500;
  return result;
};

export default mapError;