import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: string;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: Record<string, any>;
  /** A field whose value is a JSON Web Token (JWT): https://jwt.io/introduction. */
  JWT: string;
};

export type ChangePasswordInput = {
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};

export type LoginInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type RegistrateTenantInput = {
  alias: Scalars['String'];
  email: Scalars['String'];
};

export enum TenantStatus {
  Created = 'CREATED',
  New = 'NEW',
  Verified = 'VERIFIED'
}

export type UpdateTenantInput = {
  config?: InputMaybe<Array<Scalars['JSONObject']>>;
  owner?: InputMaybe<Scalars['String']>;
  status?: TenantStatus;
};

export type UserAddInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type TenantFieldsFragment = { __typename?: 'Tenant', id: string, createdAt: string, updatedAt: string, baseState: string, alias: string, email?: string | null, verificationLink?: string | null, status: TenantStatus, config?: Array<Record<string, any>> | null, owner?: string | null, createdBy?: { __typename?: 'User', id: string, username: string } | null, updatedBy?: { __typename?: 'User', id: string, username: string } | null };

export type UserFieldsFragment = { __typename?: 'User', id: string, username: string };

export type TokenFieldsFragment = { __typename?: 'Token', accessToken: string, refreshToken: string };

export type AuthFieldsFragment = { __typename?: 'Auth', accessToken: string, refreshToken: string, user: { __typename?: 'User', id: string, username: string } };

export type LoginMutationVariables = Exact<{
  data: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'Auth', accessToken: string, refreshToken: string, user: { __typename?: 'User', id: string, username: string } } };

export type RefreshTokenMutationVariables = Exact<{
  token: Scalars['JWT'];
}>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken: { __typename?: 'Token', accessToken: string, refreshToken: string } };

export type UpdateTenantMutationVariables = Exact<{
  id: Scalars['String'];
  data: UpdateTenantInput;
}>;


export type UpdateTenantMutation = { __typename?: 'Mutation', updateTenant: { __typename?: 'Tenant', id: string, createdAt: string, updatedAt: string, baseState: string, alias: string, email?: string | null, verificationLink?: string | null, status: TenantStatus, config?: Array<Record<string, any>> | null, owner?: string | null, createdBy?: { __typename?: 'User', id: string, username: string } | null, updatedBy?: { __typename?: 'User', id: string, username: string } | null } };

export type DeleteTenantMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteTenantMutation = { __typename?: 'Mutation', deleteTenant: { __typename?: 'Tenant', id: string, createdAt: string, updatedAt: string, baseState: string, alias: string, email?: string | null, verificationLink?: string | null, status: TenantStatus, config?: Array<Record<string, any>> | null, owner?: string | null, createdBy?: { __typename?: 'User', id: string, username: string } | null, updatedBy?: { __typename?: 'User', id: string, username: string } | null } };

export type RegistrateTenantMutationVariables = Exact<{
  data: RegistrateTenantInput;
}>;


export type RegistrateTenantMutation = { __typename?: 'Mutation', registrateTenant: { __typename?: 'Tenant', id: string, createdAt: string, updatedAt: string, baseState: string, alias: string, email?: string | null, verificationLink?: string | null, status: TenantStatus, config?: Array<Record<string, any>> | null, owner?: string | null, createdBy?: { __typename?: 'User', id: string, username: string } | null, updatedBy?: { __typename?: 'User', id: string, username: string } | null } };

export type BootstrapTenantMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type BootstrapTenantMutation = { __typename?: 'Mutation', bootstrapTenant?: { __typename?: 'Tenant', id: string, createdAt: string, updatedAt: string, baseState: string, alias: string, email?: string | null, verificationLink?: string | null, status: TenantStatus, config?: Array<Record<string, any>> | null, owner?: string | null, createdBy?: { __typename?: 'User', id: string, username: string } | null, updatedBy?: { __typename?: 'User', id: string, username: string } | null } | null };

export type TenantQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type TenantQuery = { __typename?: 'Query', tenant: { __typename?: 'Tenant', id: string, createdAt: string, updatedAt: string, baseState: string, alias: string, email?: string | null, verificationLink?: string | null, status: TenantStatus, config?: Array<Record<string, any>> | null, owner?: string | null, createdBy?: { __typename?: 'User', id: string, username: string } | null, updatedBy?: { __typename?: 'User', id: string, username: string } | null } };

export type TenantsQueryVariables = Exact<{ [key: string]: never; }>;


export type TenantsQuery = { __typename?: 'Query', tenants: Array<{ __typename?: 'Tenant', id: string, createdAt: string, updatedAt: string, baseState: string, alias: string, email?: string | null, verificationLink?: string | null, status: TenantStatus, config?: Array<Record<string, any>> | null, owner?: string | null, createdBy?: { __typename?: 'User', id: string, username: string } | null, updatedBy?: { __typename?: 'User', id: string, username: string } | null }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, username: string } };

export const UserFieldsFragmentDoc = gql`
    fragment UserFields on User {
  id
  username
}
    `;
export const TenantFieldsFragmentDoc = gql`
    fragment TenantFields on Tenant {
  id
  createdAt
  updatedAt
  baseState
  createdBy {
    ...UserFields
  }
  updatedBy {
    ...UserFields
  }
  alias
  email
  verificationLink
  status
  config
  owner
}
    ${UserFieldsFragmentDoc}`;
export const TokenFieldsFragmentDoc = gql`
    fragment TokenFields on Token {
  accessToken
  refreshToken
}
    `;
export const AuthFieldsFragmentDoc = gql`
    fragment AuthFields on Auth {
  accessToken
  refreshToken
  user {
    ...UserFields
  }
}
    ${UserFieldsFragmentDoc}`;
export const LoginDocument = gql`
    mutation Login($data: LoginInput!) {
  login(data: $data) {
    ...AuthFields
  }
}
    ${AuthFieldsFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RefreshTokenDocument = gql`
    mutation RefreshToken($token: JWT!) {
  refreshToken(token: $token) {
    ...TokenFields
  }
}
    ${TokenFieldsFragmentDoc}`;
export type RefreshTokenMutationFn = Apollo.MutationFunction<RefreshTokenMutation, RefreshTokenMutationVariables>;

/**
 * __useRefreshTokenMutation__
 *
 * To run a mutation, you first call `useRefreshTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshTokenMutation, { data, loading, error }] = useRefreshTokenMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useRefreshTokenMutation(baseOptions?: Apollo.MutationHookOptions<RefreshTokenMutation, RefreshTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RefreshTokenMutation, RefreshTokenMutationVariables>(RefreshTokenDocument, options);
      }
export type RefreshTokenMutationHookResult = ReturnType<typeof useRefreshTokenMutation>;
export type RefreshTokenMutationResult = Apollo.MutationResult<RefreshTokenMutation>;
export type RefreshTokenMutationOptions = Apollo.BaseMutationOptions<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const UpdateTenantDocument = gql`
    mutation UpdateTenant($id: String!, $data: UpdateTenantInput!) {
  updateTenant(id: $id, data: $data) {
    ...TenantFields
  }
}
    ${TenantFieldsFragmentDoc}`;
export type UpdateTenantMutationFn = Apollo.MutationFunction<UpdateTenantMutation, UpdateTenantMutationVariables>;

/**
 * __useUpdateTenantMutation__
 *
 * To run a mutation, you first call `useUpdateTenantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTenantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTenantMutation, { data, loading, error }] = useUpdateTenantMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateTenantMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTenantMutation, UpdateTenantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTenantMutation, UpdateTenantMutationVariables>(UpdateTenantDocument, options);
      }
export type UpdateTenantMutationHookResult = ReturnType<typeof useUpdateTenantMutation>;
export type UpdateTenantMutationResult = Apollo.MutationResult<UpdateTenantMutation>;
export type UpdateTenantMutationOptions = Apollo.BaseMutationOptions<UpdateTenantMutation, UpdateTenantMutationVariables>;
export const DeleteTenantDocument = gql`
    mutation DeleteTenant($id: String!) {
  deleteTenant(id: $id) {
    ...TenantFields
  }
}
    ${TenantFieldsFragmentDoc}`;
export type DeleteTenantMutationFn = Apollo.MutationFunction<DeleteTenantMutation, DeleteTenantMutationVariables>;

/**
 * __useDeleteTenantMutation__
 *
 * To run a mutation, you first call `useDeleteTenantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTenantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTenantMutation, { data, loading, error }] = useDeleteTenantMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTenantMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTenantMutation, DeleteTenantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTenantMutation, DeleteTenantMutationVariables>(DeleteTenantDocument, options);
      }
export type DeleteTenantMutationHookResult = ReturnType<typeof useDeleteTenantMutation>;
export type DeleteTenantMutationResult = Apollo.MutationResult<DeleteTenantMutation>;
export type DeleteTenantMutationOptions = Apollo.BaseMutationOptions<DeleteTenantMutation, DeleteTenantMutationVariables>;
export const RegistrateTenantDocument = gql`
    mutation RegistrateTenant($data: RegistrateTenantInput!) {
  registrateTenant(data: $data) {
    ...TenantFields
  }
}
    ${TenantFieldsFragmentDoc}`;
export type RegistrateTenantMutationFn = Apollo.MutationFunction<RegistrateTenantMutation, RegistrateTenantMutationVariables>;

/**
 * __useRegistrateTenantMutation__
 *
 * To run a mutation, you first call `useRegistrateTenantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegistrateTenantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registrateTenantMutation, { data, loading, error }] = useRegistrateTenantMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRegistrateTenantMutation(baseOptions?: Apollo.MutationHookOptions<RegistrateTenantMutation, RegistrateTenantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegistrateTenantMutation, RegistrateTenantMutationVariables>(RegistrateTenantDocument, options);
      }
export type RegistrateTenantMutationHookResult = ReturnType<typeof useRegistrateTenantMutation>;
export type RegistrateTenantMutationResult = Apollo.MutationResult<RegistrateTenantMutation>;
export type RegistrateTenantMutationOptions = Apollo.BaseMutationOptions<RegistrateTenantMutation, RegistrateTenantMutationVariables>;
export const BootstrapTenantDocument = gql`
    mutation BootstrapTenant($id: String!) {
  bootstrapTenant(id: $id) {
    ...TenantFields
  }
}
    ${TenantFieldsFragmentDoc}`;
export type BootstrapTenantMutationFn = Apollo.MutationFunction<BootstrapTenantMutation, BootstrapTenantMutationVariables>;

/**
 * __useBootstrapTenantMutation__
 *
 * To run a mutation, you first call `useBootstrapTenantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBootstrapTenantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bootstrapTenantMutation, { data, loading, error }] = useBootstrapTenantMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useBootstrapTenantMutation(baseOptions?: Apollo.MutationHookOptions<BootstrapTenantMutation, BootstrapTenantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BootstrapTenantMutation, BootstrapTenantMutationVariables>(BootstrapTenantDocument, options);
      }
export type BootstrapTenantMutationHookResult = ReturnType<typeof useBootstrapTenantMutation>;
export type BootstrapTenantMutationResult = Apollo.MutationResult<BootstrapTenantMutation>;
export type BootstrapTenantMutationOptions = Apollo.BaseMutationOptions<BootstrapTenantMutation, BootstrapTenantMutationVariables>;
export const TenantDocument = gql`
    query Tenant($id: String!) {
  tenant(id: $id) {
    ...TenantFields
  }
}
    ${TenantFieldsFragmentDoc}`;

/**
 * __useTenantQuery__
 *
 * To run a query within a React component, call `useTenantQuery` and pass it any options that fit your needs.
 * When your component renders, `useTenantQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTenantQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTenantQuery(baseOptions: Apollo.QueryHookOptions<TenantQuery, TenantQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TenantQuery, TenantQueryVariables>(TenantDocument, options);
      }
export function useTenantLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TenantQuery, TenantQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TenantQuery, TenantQueryVariables>(TenantDocument, options);
        }
export type TenantQueryHookResult = ReturnType<typeof useTenantQuery>;
export type TenantLazyQueryHookResult = ReturnType<typeof useTenantLazyQuery>;
export type TenantQueryResult = Apollo.QueryResult<TenantQuery, TenantQueryVariables>;
export const TenantsDocument = gql`
    query Tenants {
  tenants {
    ...TenantFields
  }
}
    ${TenantFieldsFragmentDoc}`;

/**
 * __useTenantsQuery__
 *
 * To run a query within a React component, call `useTenantsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTenantsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTenantsQuery({
 *   variables: {
 *   },
 * });
 */
export function useTenantsQuery(baseOptions?: Apollo.QueryHookOptions<TenantsQuery, TenantsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TenantsQuery, TenantsQueryVariables>(TenantsDocument, options);
      }
export function useTenantsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TenantsQuery, TenantsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TenantsQuery, TenantsQueryVariables>(TenantsDocument, options);
        }
export type TenantsQueryHookResult = ReturnType<typeof useTenantsQuery>;
export type TenantsLazyQueryHookResult = ReturnType<typeof useTenantsLazyQuery>;
export type TenantsQueryResult = Apollo.QueryResult<TenantsQuery, TenantsQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...UserFields
  }
}
    ${UserFieldsFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;