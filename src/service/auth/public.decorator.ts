import { SetMetadata } from '@nestjs/common';

// public decorator
// open public api, documents: https://docs.nestjs.com/security/authentication
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
