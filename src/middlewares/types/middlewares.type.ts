import { ApiErrors } from '../../helpers';

export type TErrorMiddlewareType = (Error & Partial<ApiErrors>) | any;
export type TConstraints = { [p: string]: string } | undefined;
