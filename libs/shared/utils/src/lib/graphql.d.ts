import 'graphql';

declare module 'graphql' {
  export interface GraphQLErrorExtensions {
    code: string;
    errors: { argumentName: string; message: string }[];
    originalError?: {
      message: string;
    };
  }
}
