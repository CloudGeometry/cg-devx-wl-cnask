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
  /** A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt. */
  URL: string;
};

export type ChangePasswordInput = {
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};

export type CreateItemInput = {
  assigneeId?: InputMaybe<Scalars['String']>;
  description: Scalars['String'];
  dueDate: Scalars['DateTime'];
  title: Scalars['String'];
};

export type CreateRoleInput = {
  name: Scalars['String'];
  permissions: Array<Scalars['JSONObject']>;
};

export type InviteInput = {
  email: Scalars['String'];
  tenantAlias?: InputMaybe<Scalars['String']>;
};

export type ItemFilterInput = {
  itemState?: InputMaybe<ItemState>;
};

export type ItemOrderByInput = {
  createdAt?: InputMaybe<Sort>;
  itemState?: InputMaybe<Sort>;
  title?: InputMaybe<Sort>;
};

export enum ItemState {
  Done = 'DONE',
  Todo = 'TODO'
}

export type LoginInput = {
  password: Scalars['String'];
  tenantAlias?: InputMaybe<Scalars['String']>;
  username: Scalars['String'];
};

export enum Sort {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type UpdateItemInput = {
  assigneeId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  dueDate?: InputMaybe<Scalars['DateTime']>;
  itemState?: InputMaybe<ItemState>;
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateProfileInput = {
  email?: InputMaybe<Scalars['String']>;
  firstname?: InputMaybe<Scalars['String']>;
  lastname?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  photo?: InputMaybe<Scalars['String']>;
};

export type UpdateRoleInput = {
  name?: InputMaybe<Scalars['String']>;
  permissions?: InputMaybe<Array<Scalars['JSONObject']>>;
};

export type UpdateUserRoleInput = {
  roleId: Scalars['String'];
};

export type UserAddInput = {
  email?: InputMaybe<Scalars['String']>;
  firstname: Scalars['String'];
  inviteId?: InputMaybe<Scalars['String']>;
  lastname: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  phoneNumber?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['String']>;
  tenantAlias?: InputMaybe<Scalars['String']>;
  username: Scalars['String'];
};

export type UserFilterInput = {
  userFirstLastName?: InputMaybe<Scalars['String']>;
};

export type UserFieldsFragment = { __typename?: 'User', id: string, username?: string | null, baseState: string };

export type TokenFieldsFragment = { __typename?: 'Token', accessToken: string, refreshToken: string };

export type AuthFieldsFragment = { __typename?: 'Auth', accessToken: string, refreshToken: string, user: { __typename?: 'User', id: string, username?: string | null, baseState: string } };

export type RoleFragment = { __typename?: 'User', role?: { __typename?: 'Role', id: string, name: string, permissions?: Array<Record<string, any>> | null } | null };

export type ProfileFieldsFragment = { __typename?: 'Profile', firstname?: string | null, lastname?: string | null, email: string, phoneNumber?: string | null, locale?: string | null, photo?: string | null };

export type MeFieldsFragment = { __typename?: 'User', id: string, username?: string | null, baseState: string, profile?: { __typename?: 'Profile', firstname?: string | null, lastname?: string | null, email: string, phoneNumber?: string | null, locale?: string | null, photo?: string | null } | null, role?: { __typename?: 'Role', id: string, name: string, permissions?: Array<Record<string, any>> | null } | null };

export type AssigneeFieldsFragment = { __typename?: 'User', id: string, profile?: { __typename?: 'Profile', firstname?: string | null, lastname?: string | null } | null };

export type ItemFieldsFragment = { __typename?: 'Item', id: string, createdAt: string, updatedAt: string, title: string, description?: string | null, dueDate: string, itemState: ItemState, createdBy?: { __typename?: 'User', id: string, username?: string | null, baseState: string, profile?: { __typename?: 'Profile', firstname?: string | null, lastname?: string | null } | null } | null, updatedBy?: { __typename?: 'User', id: string, username?: string | null, baseState: string } | null, assignee?: { __typename?: 'User', id: string, profile?: { __typename?: 'Profile', firstname?: string | null, lastname?: string | null } | null } | null };

export type PageInfoFieldsFragment = { __typename?: 'PageInfo', endCursor?: string | null, startCursor?: string | null, hasNextPage: boolean, hasPreviousPage: boolean };

export type PaginatedItemsEdgesFieldsFragment = { __typename?: 'PaginatedItems', totalCount: number, edges?: Array<{ __typename?: 'ItemEdge', cursor: string, node: { __typename?: 'Item', id: string, createdAt: string, updatedAt: string, title: string, description?: string | null, dueDate: string, itemState: ItemState, createdBy?: { __typename?: 'User', id: string, username?: string | null, baseState: string, profile?: { __typename?: 'Profile', firstname?: string | null, lastname?: string | null } | null } | null, updatedBy?: { __typename?: 'User', id: string, username?: string | null, baseState: string } | null, assignee?: { __typename?: 'User', id: string, profile?: { __typename?: 'Profile', firstname?: string | null, lastname?: string | null } | null } | null } }> | null, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, startCursor?: string | null, hasNextPage: boolean, hasPreviousPage: boolean } };

export type PaginatedItemNodesFieldsFragment = { __typename?: 'PaginatedItems', totalCount: number, nodes?: Array<{ __typename?: 'Item', id: string, createdAt: string, updatedAt: string, title: string, description?: string | null, dueDate: string, itemState: ItemState, createdBy?: { __typename?: 'User', id: string, username?: string | null, baseState: string, profile?: { __typename?: 'Profile', firstname?: string | null, lastname?: string | null } | null } | null, updatedBy?: { __typename?: 'User', id: string, username?: string | null, baseState: string } | null, assignee?: { __typename?: 'User', id: string, profile?: { __typename?: 'Profile', firstname?: string | null, lastname?: string | null } | null } | null }> | null, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, startCursor?: string | null, hasNextPage: boolean, hasPreviousPage: boolean } };

export type RoleFieldsFragment = { __typename?: 'Role', id: string, name: string };

export type LoginMutationVariables = Exact<{
  data: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'Auth', accessToken: string, refreshToken: string, user: { __typename?: 'User', id: string, username?: string | null, baseState: string, profile?: { __typename?: 'Profile', firstname?: string | null, lastname?: string | null, email: string, phoneNumber?: string | null, locale?: string | null, photo?: string | null } | null, role?: { __typename?: 'Role', id: string, name: string, permissions?: Array<Record<string, any>> | null } | null } } };

export type SignUpMutationVariables = Exact<{
  data: UserAddInput;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signup: { __typename?: 'Auth', accessToken: string, refreshToken: string, user: { __typename?: 'User', id: string, username?: string | null, baseState: string, profile?: { __typename?: 'Profile', firstname?: string | null, lastname?: string | null, email: string, phoneNumber?: string | null, locale?: string | null, photo?: string | null } | null, role?: { __typename?: 'Role', id: string, name: string, permissions?: Array<Record<string, any>> | null } | null } } };

export type ConfirmTenantMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type ConfirmTenantMutation = { __typename?: 'Mutation', confirmTenant: boolean };

export type ActivateUserMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type ActivateUserMutation = { __typename?: 'Mutation', activateUser: { __typename?: 'User', id: string, username?: string | null, baseState: string, profile?: { __typename?: 'Profile', firstname?: string | null, lastname?: string | null, email: string, phoneNumber?: string | null, locale?: string | null, photo?: string | null } | null, role?: { __typename?: 'Role', id: string, name: string, permissions?: Array<Record<string, any>> | null } | null } };

export type DeactivateUserMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeactivateUserMutation = { __typename?: 'Mutation', deactivateUser: { __typename?: 'User', id: string, username?: string | null, baseState: string, profile?: { __typename?: 'Profile', firstname?: string | null, lastname?: string | null, email: string, phoneNumber?: string | null, locale?: string | null, photo?: string | null } | null, role?: { __typename?: 'Role', id: string, name: string, permissions?: Array<Record<string, any>> | null } | null } };

export type RefreshTokenMutationVariables = Exact<{
  refreshToken: Scalars['JWT'];
}>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken: { __typename?: 'Token', accessToken: string, refreshToken: string } };

export type UpdateProfileMutationVariables = Exact<{
  id: Scalars['String'];
  data: UpdateProfileInput;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile: { __typename?: 'Profile', firstname?: string | null, lastname?: string | null, email: string, phoneNumber?: string | null, locale?: string | null, photo?: string | null } };

export type UpdateUserRoleMutationVariables = Exact<{
  id: Scalars['String'];
  data: UpdateUserRoleInput;
}>;


export type UpdateUserRoleMutation = { __typename?: 'Mutation', updateUserRole: { __typename?: 'User', id: string, username?: string | null, baseState: string, profile?: { __typename?: 'Profile', firstname?: string | null, lastname?: string | null, email: string, phoneNumber?: string | null, locale?: string | null, photo?: string | null } | null, role?: { __typename?: 'Role', id: string, name: string, permissions?: Array<Record<string, any>> | null } | null } };

export type ChangePasswordMutationVariables = Exact<{
  data: ChangePasswordInput;
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'User', id: string, username?: string | null, baseState: string, profile?: { __typename?: 'Profile', firstname?: string | null, lastname?: string | null, email: string, phoneNumber?: string | null, locale?: string | null, photo?: string | null } | null, role?: { __typename?: 'Role', id: string, name: string, permissions?: Array<Record<string, any>> | null } | null } };

export type CreateItemMutationVariables = Exact<{
  data: CreateItemInput;
}>;


export type CreateItemMutation = { __typename?: 'Mutation', createItem: { __typename?: 'Item', id: string, createdAt: string, updatedAt: string, title: string, description?: string | null, dueDate: string, itemState: ItemState, createdBy?: { __typename?: 'User', id: string, username?: string | null, baseState: string, profile?: { __typename?: 'Profile', firstname?: string | null, lastname?: string | null } | null } | null, updatedBy?: { __typename?: 'User', id: string, username?: string | null, baseState: string } | null, assignee?: { __typename?: 'User', id: string, profile?: { __typename?: 'Profile', firstname?: string | null, lastname?: string | null } | null } | null } };

export type UpdateItemMutationVariables = Exact<{
  id: Scalars['String'];
  data: UpdateItemInput;
}>;


export type UpdateItemMutation = { __typename?: 'Mutation', updateItem: { __typename?: 'Item', id: string, createdAt: string, updatedAt: string, title: string, description?: string | null, dueDate: string, itemState: ItemState, createdBy?: { __typename?: 'User', id: string, username?: string | null, baseState: string, profile?: { __typename?: 'Profile', firstname?: string | null, lastname?: string | null } | null } | null, updatedBy?: { __typename?: 'User', id: string, username?: string | null, baseState: string } | null, assignee?: { __typename?: 'User', id: string, profile?: { __typename?: 'Profile', firstname?: string | null, lastname?: string | null } | null } | null } };

export type DeleteItemMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteItemMutation = { __typename?: 'Mutation', deleteItem: { __typename?: 'Item', id: string, createdAt: string, updatedAt: string, title: string, description?: string | null, dueDate: string, itemState: ItemState, createdBy?: { __typename?: 'User', id: string, username?: string | null, baseState: string, profile?: { __typename?: 'Profile', firstname?: string | null, lastname?: string | null } | null } | null, updatedBy?: { __typename?: 'User', id: string, username?: string | null, baseState: string } | null, assignee?: { __typename?: 'User', id: string, profile?: { __typename?: 'Profile', firstname?: string | null, lastname?: string | null } | null } | null } };

export type UpdateLocaleMutationVariables = Exact<{
  id: Scalars['String'];
  data: UpdateProfileInput;
}>;


export type UpdateLocaleMutation = { __typename?: 'Mutation', updateProfile: { __typename?: 'Profile', firstname?: string | null, lastname?: string | null, email: string, phoneNumber?: string | null, locale?: string | null, photo?: string | null } };

export type CreateInviteMutationVariables = Exact<{
  data: InviteInput;
}>;


export type CreateInviteMutation = { __typename?: 'Mutation', createInvite?: { __typename?: 'Invite', id: string, email: string, link: string } | null };

export type DecodeInviteTokenMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type DecodeInviteTokenMutation = { __typename?: 'Mutation', decodeInviteToken?: { __typename?: 'Invite', id: string, email: string } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, username?: string | null, baseState: string, profile?: { __typename?: 'Profile', firstname?: string | null, lastname?: string | null, email: string, phoneNumber?: string | null, locale?: string | null, photo?: string | null } | null, role?: { __typename?: 'Role', id: string, name: string, permissions?: Array<Record<string, any>> | null } | null } };

export type FirstItemsAfterUseEdgesQueryVariables = Exact<{
  filter?: InputMaybe<ItemFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  orderBy?: InputMaybe<ItemOrderByInput>;
}>;


export type FirstItemsAfterUseEdgesQuery = { __typename?: 'Query', items: { __typename?: 'PaginatedItems', totalCount: number, edges?: Array<{ __typename?: 'ItemEdge', cursor: string, node: { __typename?: 'Item', id: string, createdAt: string, updatedAt: string, title: string, description?: string | null, dueDate: string, itemState: ItemState, createdBy?: { __typename?: 'User', id: string, username?: string | null, baseState: string, profile?: { __typename?: 'Profile', firstname?: string | null, lastname?: string | null } | null } | null, updatedBy?: { __typename?: 'User', id: string, username?: string | null, baseState: string } | null, assignee?: { __typename?: 'User', id: string, profile?: { __typename?: 'Profile', firstname?: string | null, lastname?: string | null } | null } | null } }> | null, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, startCursor?: string | null, hasNextPage: boolean, hasPreviousPage: boolean } } };

export type LastItemsBeforeUseEdgesQueryVariables = Exact<{
  state?: InputMaybe<ItemFilterInput>;
  last?: InputMaybe<Scalars['Int']>;
  before?: InputMaybe<Scalars['String']>;
  orderBy?: InputMaybe<ItemOrderByInput>;
}>;


export type LastItemsBeforeUseEdgesQuery = { __typename?: 'Query', items: { __typename?: 'PaginatedItems', totalCount: number, edges?: Array<{ __typename?: 'ItemEdge', cursor: string, node: { __typename?: 'Item', id: string, createdAt: string, updatedAt: string, title: string, description?: string | null, dueDate: string, itemState: ItemState, createdBy?: { __typename?: 'User', id: string, username?: string | null, baseState: string, profile?: { __typename?: 'Profile', firstname?: string | null, lastname?: string | null } | null } | null, updatedBy?: { __typename?: 'User', id: string, username?: string | null, baseState: string } | null, assignee?: { __typename?: 'User', id: string, profile?: { __typename?: 'Profile', firstname?: string | null, lastname?: string | null } | null } | null } }> | null, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, startCursor?: string | null, hasNextPage: boolean, hasPreviousPage: boolean } } };

export type FirstItemsAfterUseNodesQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  orderBy?: InputMaybe<ItemOrderByInput>;
  filter?: InputMaybe<ItemFilterInput>;
}>;


export type FirstItemsAfterUseNodesQuery = { __typename?: 'Query', items: { __typename?: 'PaginatedItems', totalCount: number, nodes?: Array<{ __typename?: 'Item', id: string, createdAt: string, updatedAt: string, title: string, description?: string | null, dueDate: string, itemState: ItemState, createdBy?: { __typename?: 'User', id: string, username?: string | null, baseState: string, profile?: { __typename?: 'Profile', firstname?: string | null, lastname?: string | null } | null } | null, updatedBy?: { __typename?: 'User', id: string, username?: string | null, baseState: string } | null, assignee?: { __typename?: 'User', id: string, profile?: { __typename?: 'Profile', firstname?: string | null, lastname?: string | null } | null } | null }> | null, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, startCursor?: string | null, hasNextPage: boolean, hasPreviousPage: boolean } } };

export type LastItemsBeforeUseNodesQueryVariables = Exact<{
  state?: InputMaybe<ItemFilterInput>;
  last?: InputMaybe<Scalars['Int']>;
  before?: InputMaybe<Scalars['String']>;
  orderBy?: InputMaybe<ItemOrderByInput>;
}>;


export type LastItemsBeforeUseNodesQuery = { __typename?: 'Query', items: { __typename?: 'PaginatedItems', totalCount: number, nodes?: Array<{ __typename?: 'Item', id: string, createdAt: string, updatedAt: string, title: string, description?: string | null, dueDate: string, itemState: ItemState, createdBy?: { __typename?: 'User', id: string, username?: string | null, baseState: string, profile?: { __typename?: 'Profile', firstname?: string | null, lastname?: string | null } | null } | null, updatedBy?: { __typename?: 'User', id: string, username?: string | null, baseState: string } | null, assignee?: { __typename?: 'User', id: string, profile?: { __typename?: 'Profile', firstname?: string | null, lastname?: string | null } | null } | null }> | null, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, startCursor?: string | null, hasNextPage: boolean, hasPreviousPage: boolean } } };

export type ItemQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ItemQuery = { __typename?: 'Query', item: { __typename?: 'Item', id: string, createdAt: string, updatedAt: string, title: string, description?: string | null, dueDate: string, itemState: ItemState, createdBy?: { __typename?: 'User', id: string, username?: string | null, baseState: string, profile?: { __typename?: 'Profile', firstname?: string | null, lastname?: string | null } | null } | null, updatedBy?: { __typename?: 'User', id: string, username?: string | null, baseState: string } | null, assignee?: { __typename?: 'User', id: string, profile?: { __typename?: 'Profile', firstname?: string | null, lastname?: string | null } | null } | null } };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, username?: string | null, baseState: string, profile?: { __typename?: 'Profile', firstname?: string | null, lastname?: string | null, email: string, phoneNumber?: string | null, locale?: string | null, photo?: string | null } | null, role?: { __typename?: 'Role', id: string, name: string, permissions?: Array<Record<string, any>> | null } | null }> };

export type RolesQueryVariables = Exact<{ [key: string]: never; }>;


export type RolesQuery = { __typename?: 'Query', roles: Array<{ __typename?: 'Role', id: string, name: string }> };

export type GetUploadUrlQueryVariables = Exact<{
  imageFormat: Scalars['String'];
}>;


export type GetUploadUrlQuery = { __typename?: 'Query', getUploadUrl: string };

export const TokenFieldsFragmentDoc = gql`
    fragment TokenFields on Token {
  accessToken
  refreshToken
}
    `;
export const UserFieldsFragmentDoc = gql`
    fragment UserFields on User {
  id
  username
  baseState
}
    `;
export const AuthFieldsFragmentDoc = gql`
    fragment AuthFields on Auth {
  user {
    ...UserFields
  }
  accessToken
  refreshToken
}
    ${UserFieldsFragmentDoc}`;
export const RoleFragmentDoc = gql`
    fragment Role on User {
  role {
    id
    name
    permissions
  }
}
    `;
export const ProfileFieldsFragmentDoc = gql`
    fragment ProfileFields on Profile {
  firstname
  lastname
  email
  phoneNumber
  locale
  photo
}
    `;
export const MeFieldsFragmentDoc = gql`
    fragment MeFields on User {
  ...UserFields
  ...Role
  profile {
    ...ProfileFields
  }
}
    ${UserFieldsFragmentDoc}
${RoleFragmentDoc}
${ProfileFieldsFragmentDoc}`;
export const AssigneeFieldsFragmentDoc = gql`
    fragment AssigneeFields on User {
  id
  profile {
    firstname
    lastname
  }
}
    `;
export const ItemFieldsFragmentDoc = gql`
    fragment ItemFields on Item {
  id
  createdAt
  createdBy {
    ...UserFields
    profile {
      firstname
      lastname
    }
  }
  updatedAt
  updatedBy {
    ...UserFields
  }
  title
  description
  dueDate
  itemState
  assignee {
    ...AssigneeFields
  }
}
    ${UserFieldsFragmentDoc}
${AssigneeFieldsFragmentDoc}`;
export const PageInfoFieldsFragmentDoc = gql`
    fragment PageInfoFields on PageInfo {
  endCursor
  startCursor
  hasNextPage
  hasPreviousPage
}
    `;
export const PaginatedItemsEdgesFieldsFragmentDoc = gql`
    fragment PaginatedItemsEdgesFields on PaginatedItems {
  edges {
    node {
      ...ItemFields
    }
    cursor
  }
  totalCount
  pageInfo {
    ...PageInfoFields
  }
}
    ${ItemFieldsFragmentDoc}
${PageInfoFieldsFragmentDoc}`;
export const PaginatedItemNodesFieldsFragmentDoc = gql`
    fragment PaginatedItemNodesFields on PaginatedItems {
  nodes {
    ...ItemFields
  }
  totalCount
  pageInfo {
    ...PageInfoFields
  }
}
    ${ItemFieldsFragmentDoc}
${PageInfoFieldsFragmentDoc}`;
export const RoleFieldsFragmentDoc = gql`
    fragment RoleFields on Role {
  id
  name
}
    `;
export const LoginDocument = gql`
    mutation Login($data: LoginInput!) {
  login(data: $data) {
    accessToken
    refreshToken
    user {
      ...MeFields
    }
  }
}
    ${MeFieldsFragmentDoc}`;
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
export const SignUpDocument = gql`
    mutation SignUp($data: UserAddInput!) {
  signup(data: $data) {
    accessToken
    refreshToken
    user {
      ...MeFields
    }
  }
}
    ${MeFieldsFragmentDoc}`;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const ConfirmTenantDocument = gql`
    mutation ConfirmTenant($token: String!) {
  confirmTenant(token: $token)
}
    `;
export type ConfirmTenantMutationFn = Apollo.MutationFunction<ConfirmTenantMutation, ConfirmTenantMutationVariables>;

/**
 * __useConfirmTenantMutation__
 *
 * To run a mutation, you first call `useConfirmTenantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmTenantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmTenantMutation, { data, loading, error }] = useConfirmTenantMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useConfirmTenantMutation(baseOptions?: Apollo.MutationHookOptions<ConfirmTenantMutation, ConfirmTenantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConfirmTenantMutation, ConfirmTenantMutationVariables>(ConfirmTenantDocument, options);
      }
export type ConfirmTenantMutationHookResult = ReturnType<typeof useConfirmTenantMutation>;
export type ConfirmTenantMutationResult = Apollo.MutationResult<ConfirmTenantMutation>;
export type ConfirmTenantMutationOptions = Apollo.BaseMutationOptions<ConfirmTenantMutation, ConfirmTenantMutationVariables>;
export const ActivateUserDocument = gql`
    mutation ActivateUser($id: String!) {
  activateUser(id: $id) {
    ...MeFields
  }
}
    ${MeFieldsFragmentDoc}`;
export type ActivateUserMutationFn = Apollo.MutationFunction<ActivateUserMutation, ActivateUserMutationVariables>;

/**
 * __useActivateUserMutation__
 *
 * To run a mutation, you first call `useActivateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useActivateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [activateUserMutation, { data, loading, error }] = useActivateUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useActivateUserMutation(baseOptions?: Apollo.MutationHookOptions<ActivateUserMutation, ActivateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ActivateUserMutation, ActivateUserMutationVariables>(ActivateUserDocument, options);
      }
export type ActivateUserMutationHookResult = ReturnType<typeof useActivateUserMutation>;
export type ActivateUserMutationResult = Apollo.MutationResult<ActivateUserMutation>;
export type ActivateUserMutationOptions = Apollo.BaseMutationOptions<ActivateUserMutation, ActivateUserMutationVariables>;
export const DeactivateUserDocument = gql`
    mutation DeactivateUser($id: String!) {
  deactivateUser(id: $id) {
    ...MeFields
  }
}
    ${MeFieldsFragmentDoc}`;
export type DeactivateUserMutationFn = Apollo.MutationFunction<DeactivateUserMutation, DeactivateUserMutationVariables>;

/**
 * __useDeactivateUserMutation__
 *
 * To run a mutation, you first call `useDeactivateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeactivateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deactivateUserMutation, { data, loading, error }] = useDeactivateUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeactivateUserMutation(baseOptions?: Apollo.MutationHookOptions<DeactivateUserMutation, DeactivateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeactivateUserMutation, DeactivateUserMutationVariables>(DeactivateUserDocument, options);
      }
export type DeactivateUserMutationHookResult = ReturnType<typeof useDeactivateUserMutation>;
export type DeactivateUserMutationResult = Apollo.MutationResult<DeactivateUserMutation>;
export type DeactivateUserMutationOptions = Apollo.BaseMutationOptions<DeactivateUserMutation, DeactivateUserMutationVariables>;
export const RefreshTokenDocument = gql`
    mutation RefreshToken($refreshToken: JWT!) {
  refreshToken(token: $refreshToken) {
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
 *      refreshToken: // value for 'refreshToken'
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
export const UpdateProfileDocument = gql`
    mutation UpdateProfile($id: String!, $data: UpdateProfileInput!) {
  updateProfile(id: $id, data: $data) {
    ...ProfileFields
  }
}
    ${ProfileFieldsFragmentDoc}`;
export type UpdateProfileMutationFn = Apollo.MutationFunction<UpdateProfileMutation, UpdateProfileMutationVariables>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, options);
      }
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const UpdateUserRoleDocument = gql`
    mutation UpdateUserRole($id: String!, $data: UpdateUserRoleInput!) {
  updateUserRole(id: $id, data: $data) {
    ...MeFields
  }
}
    ${MeFieldsFragmentDoc}`;
export type UpdateUserRoleMutationFn = Apollo.MutationFunction<UpdateUserRoleMutation, UpdateUserRoleMutationVariables>;

/**
 * __useUpdateUserRoleMutation__
 *
 * To run a mutation, you first call `useUpdateUserRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserRoleMutation, { data, loading, error }] = useUpdateUserRoleMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateUserRoleMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserRoleMutation, UpdateUserRoleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserRoleMutation, UpdateUserRoleMutationVariables>(UpdateUserRoleDocument, options);
      }
export type UpdateUserRoleMutationHookResult = ReturnType<typeof useUpdateUserRoleMutation>;
export type UpdateUserRoleMutationResult = Apollo.MutationResult<UpdateUserRoleMutation>;
export type UpdateUserRoleMutationOptions = Apollo.BaseMutationOptions<UpdateUserRoleMutation, UpdateUserRoleMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($data: ChangePasswordInput!) {
  changePassword(data: $data) {
    ...MeFields
  }
}
    ${MeFieldsFragmentDoc}`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const CreateItemDocument = gql`
    mutation CreateItem($data: CreateItemInput!) {
  createItem(data: $data) {
    ...ItemFields
  }
}
    ${ItemFieldsFragmentDoc}`;
export type CreateItemMutationFn = Apollo.MutationFunction<CreateItemMutation, CreateItemMutationVariables>;

/**
 * __useCreateItemMutation__
 *
 * To run a mutation, you first call `useCreateItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createItemMutation, { data, loading, error }] = useCreateItemMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateItemMutation(baseOptions?: Apollo.MutationHookOptions<CreateItemMutation, CreateItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateItemMutation, CreateItemMutationVariables>(CreateItemDocument, options);
      }
export type CreateItemMutationHookResult = ReturnType<typeof useCreateItemMutation>;
export type CreateItemMutationResult = Apollo.MutationResult<CreateItemMutation>;
export type CreateItemMutationOptions = Apollo.BaseMutationOptions<CreateItemMutation, CreateItemMutationVariables>;
export const UpdateItemDocument = gql`
    mutation UpdateItem($id: String!, $data: UpdateItemInput!) {
  updateItem(id: $id, data: $data) {
    ...ItemFields
  }
}
    ${ItemFieldsFragmentDoc}`;
export type UpdateItemMutationFn = Apollo.MutationFunction<UpdateItemMutation, UpdateItemMutationVariables>;

/**
 * __useUpdateItemMutation__
 *
 * To run a mutation, you first call `useUpdateItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateItemMutation, { data, loading, error }] = useUpdateItemMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateItemMutation(baseOptions?: Apollo.MutationHookOptions<UpdateItemMutation, UpdateItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateItemMutation, UpdateItemMutationVariables>(UpdateItemDocument, options);
      }
export type UpdateItemMutationHookResult = ReturnType<typeof useUpdateItemMutation>;
export type UpdateItemMutationResult = Apollo.MutationResult<UpdateItemMutation>;
export type UpdateItemMutationOptions = Apollo.BaseMutationOptions<UpdateItemMutation, UpdateItemMutationVariables>;
export const DeleteItemDocument = gql`
    mutation DeleteItem($id: String!) {
  deleteItem(id: $id) {
    ...ItemFields
  }
}
    ${ItemFieldsFragmentDoc}`;
export type DeleteItemMutationFn = Apollo.MutationFunction<DeleteItemMutation, DeleteItemMutationVariables>;

/**
 * __useDeleteItemMutation__
 *
 * To run a mutation, you first call `useDeleteItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteItemMutation, { data, loading, error }] = useDeleteItemMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteItemMutation(baseOptions?: Apollo.MutationHookOptions<DeleteItemMutation, DeleteItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteItemMutation, DeleteItemMutationVariables>(DeleteItemDocument, options);
      }
export type DeleteItemMutationHookResult = ReturnType<typeof useDeleteItemMutation>;
export type DeleteItemMutationResult = Apollo.MutationResult<DeleteItemMutation>;
export type DeleteItemMutationOptions = Apollo.BaseMutationOptions<DeleteItemMutation, DeleteItemMutationVariables>;
export const UpdateLocaleDocument = gql`
    mutation UpdateLocale($id: String!, $data: UpdateProfileInput!) {
  updateProfile(id: $id, data: $data) {
    ...ProfileFields
  }
}
    ${ProfileFieldsFragmentDoc}`;
export type UpdateLocaleMutationFn = Apollo.MutationFunction<UpdateLocaleMutation, UpdateLocaleMutationVariables>;

/**
 * __useUpdateLocaleMutation__
 *
 * To run a mutation, you first call `useUpdateLocaleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLocaleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLocaleMutation, { data, loading, error }] = useUpdateLocaleMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateLocaleMutation(baseOptions?: Apollo.MutationHookOptions<UpdateLocaleMutation, UpdateLocaleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateLocaleMutation, UpdateLocaleMutationVariables>(UpdateLocaleDocument, options);
      }
export type UpdateLocaleMutationHookResult = ReturnType<typeof useUpdateLocaleMutation>;
export type UpdateLocaleMutationResult = Apollo.MutationResult<UpdateLocaleMutation>;
export type UpdateLocaleMutationOptions = Apollo.BaseMutationOptions<UpdateLocaleMutation, UpdateLocaleMutationVariables>;
export const CreateInviteDocument = gql`
    mutation CreateInvite($data: InviteInput!) {
  createInvite(data: $data) {
    id
    email
    link
  }
}
    `;
export type CreateInviteMutationFn = Apollo.MutationFunction<CreateInviteMutation, CreateInviteMutationVariables>;

/**
 * __useCreateInviteMutation__
 *
 * To run a mutation, you first call `useCreateInviteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateInviteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createInviteMutation, { data, loading, error }] = useCreateInviteMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateInviteMutation(baseOptions?: Apollo.MutationHookOptions<CreateInviteMutation, CreateInviteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateInviteMutation, CreateInviteMutationVariables>(CreateInviteDocument, options);
      }
export type CreateInviteMutationHookResult = ReturnType<typeof useCreateInviteMutation>;
export type CreateInviteMutationResult = Apollo.MutationResult<CreateInviteMutation>;
export type CreateInviteMutationOptions = Apollo.BaseMutationOptions<CreateInviteMutation, CreateInviteMutationVariables>;
export const DecodeInviteTokenDocument = gql`
    mutation DecodeInviteToken($token: String!) {
  decodeInviteToken(token: $token) {
    id
    email
  }
}
    `;
export type DecodeInviteTokenMutationFn = Apollo.MutationFunction<DecodeInviteTokenMutation, DecodeInviteTokenMutationVariables>;

/**
 * __useDecodeInviteTokenMutation__
 *
 * To run a mutation, you first call `useDecodeInviteTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDecodeInviteTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [decodeInviteTokenMutation, { data, loading, error }] = useDecodeInviteTokenMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useDecodeInviteTokenMutation(baseOptions?: Apollo.MutationHookOptions<DecodeInviteTokenMutation, DecodeInviteTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DecodeInviteTokenMutation, DecodeInviteTokenMutationVariables>(DecodeInviteTokenDocument, options);
      }
export type DecodeInviteTokenMutationHookResult = ReturnType<typeof useDecodeInviteTokenMutation>;
export type DecodeInviteTokenMutationResult = Apollo.MutationResult<DecodeInviteTokenMutation>;
export type DecodeInviteTokenMutationOptions = Apollo.BaseMutationOptions<DecodeInviteTokenMutation, DecodeInviteTokenMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...MeFields
  }
}
    ${MeFieldsFragmentDoc}`;

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
export const FirstItemsAfterUseEdgesDocument = gql`
    query FirstItemsAfterUseEdges($filter: ItemFilterInput, $first: Int, $after: String, $orderBy: ItemOrderByInput) {
  items(filter: $filter, first: $first, after: $after, orderBy: $orderBy) {
    ...PaginatedItemsEdgesFields
  }
}
    ${PaginatedItemsEdgesFieldsFragmentDoc}`;

/**
 * __useFirstItemsAfterUseEdgesQuery__
 *
 * To run a query within a React component, call `useFirstItemsAfterUseEdgesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFirstItemsAfterUseEdgesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFirstItemsAfterUseEdgesQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useFirstItemsAfterUseEdgesQuery(baseOptions?: Apollo.QueryHookOptions<FirstItemsAfterUseEdgesQuery, FirstItemsAfterUseEdgesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FirstItemsAfterUseEdgesQuery, FirstItemsAfterUseEdgesQueryVariables>(FirstItemsAfterUseEdgesDocument, options);
      }
export function useFirstItemsAfterUseEdgesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FirstItemsAfterUseEdgesQuery, FirstItemsAfterUseEdgesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FirstItemsAfterUseEdgesQuery, FirstItemsAfterUseEdgesQueryVariables>(FirstItemsAfterUseEdgesDocument, options);
        }
export type FirstItemsAfterUseEdgesQueryHookResult = ReturnType<typeof useFirstItemsAfterUseEdgesQuery>;
export type FirstItemsAfterUseEdgesLazyQueryHookResult = ReturnType<typeof useFirstItemsAfterUseEdgesLazyQuery>;
export type FirstItemsAfterUseEdgesQueryResult = Apollo.QueryResult<FirstItemsAfterUseEdgesQuery, FirstItemsAfterUseEdgesQueryVariables>;
export const LastItemsBeforeUseEdgesDocument = gql`
    query LastItemsBeforeUseEdges($state: ItemFilterInput, $last: Int, $before: String, $orderBy: ItemOrderByInput) {
  items(filter: $state, last: $last, before: $before, orderBy: $orderBy) {
    ...PaginatedItemsEdgesFields
  }
}
    ${PaginatedItemsEdgesFieldsFragmentDoc}`;

/**
 * __useLastItemsBeforeUseEdgesQuery__
 *
 * To run a query within a React component, call `useLastItemsBeforeUseEdgesQuery` and pass it any options that fit your needs.
 * When your component renders, `useLastItemsBeforeUseEdgesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLastItemsBeforeUseEdgesQuery({
 *   variables: {
 *      state: // value for 'state'
 *      last: // value for 'last'
 *      before: // value for 'before'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useLastItemsBeforeUseEdgesQuery(baseOptions?: Apollo.QueryHookOptions<LastItemsBeforeUseEdgesQuery, LastItemsBeforeUseEdgesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LastItemsBeforeUseEdgesQuery, LastItemsBeforeUseEdgesQueryVariables>(LastItemsBeforeUseEdgesDocument, options);
      }
export function useLastItemsBeforeUseEdgesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LastItemsBeforeUseEdgesQuery, LastItemsBeforeUseEdgesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LastItemsBeforeUseEdgesQuery, LastItemsBeforeUseEdgesQueryVariables>(LastItemsBeforeUseEdgesDocument, options);
        }
export type LastItemsBeforeUseEdgesQueryHookResult = ReturnType<typeof useLastItemsBeforeUseEdgesQuery>;
export type LastItemsBeforeUseEdgesLazyQueryHookResult = ReturnType<typeof useLastItemsBeforeUseEdgesLazyQuery>;
export type LastItemsBeforeUseEdgesQueryResult = Apollo.QueryResult<LastItemsBeforeUseEdgesQuery, LastItemsBeforeUseEdgesQueryVariables>;
export const FirstItemsAfterUseNodesDocument = gql`
    query FirstItemsAfterUseNodes($first: Int, $after: String, $orderBy: ItemOrderByInput, $filter: ItemFilterInput) {
  items(filter: $filter, first: $first, after: $after, orderBy: $orderBy) {
    ...PaginatedItemNodesFields
  }
}
    ${PaginatedItemNodesFieldsFragmentDoc}`;

/**
 * __useFirstItemsAfterUseNodesQuery__
 *
 * To run a query within a React component, call `useFirstItemsAfterUseNodesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFirstItemsAfterUseNodesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFirstItemsAfterUseNodesQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      orderBy: // value for 'orderBy'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useFirstItemsAfterUseNodesQuery(baseOptions?: Apollo.QueryHookOptions<FirstItemsAfterUseNodesQuery, FirstItemsAfterUseNodesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FirstItemsAfterUseNodesQuery, FirstItemsAfterUseNodesQueryVariables>(FirstItemsAfterUseNodesDocument, options);
      }
export function useFirstItemsAfterUseNodesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FirstItemsAfterUseNodesQuery, FirstItemsAfterUseNodesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FirstItemsAfterUseNodesQuery, FirstItemsAfterUseNodesQueryVariables>(FirstItemsAfterUseNodesDocument, options);
        }
export type FirstItemsAfterUseNodesQueryHookResult = ReturnType<typeof useFirstItemsAfterUseNodesQuery>;
export type FirstItemsAfterUseNodesLazyQueryHookResult = ReturnType<typeof useFirstItemsAfterUseNodesLazyQuery>;
export type FirstItemsAfterUseNodesQueryResult = Apollo.QueryResult<FirstItemsAfterUseNodesQuery, FirstItemsAfterUseNodesQueryVariables>;
export const LastItemsBeforeUseNodesDocument = gql`
    query LastItemsBeforeUseNodes($state: ItemFilterInput, $last: Int, $before: String, $orderBy: ItemOrderByInput) {
  items(filter: $state, last: $last, before: $before, orderBy: $orderBy) {
    ...PaginatedItemNodesFields
  }
}
    ${PaginatedItemNodesFieldsFragmentDoc}`;

/**
 * __useLastItemsBeforeUseNodesQuery__
 *
 * To run a query within a React component, call `useLastItemsBeforeUseNodesQuery` and pass it any options that fit your needs.
 * When your component renders, `useLastItemsBeforeUseNodesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLastItemsBeforeUseNodesQuery({
 *   variables: {
 *      state: // value for 'state'
 *      last: // value for 'last'
 *      before: // value for 'before'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useLastItemsBeforeUseNodesQuery(baseOptions?: Apollo.QueryHookOptions<LastItemsBeforeUseNodesQuery, LastItemsBeforeUseNodesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LastItemsBeforeUseNodesQuery, LastItemsBeforeUseNodesQueryVariables>(LastItemsBeforeUseNodesDocument, options);
      }
export function useLastItemsBeforeUseNodesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LastItemsBeforeUseNodesQuery, LastItemsBeforeUseNodesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LastItemsBeforeUseNodesQuery, LastItemsBeforeUseNodesQueryVariables>(LastItemsBeforeUseNodesDocument, options);
        }
export type LastItemsBeforeUseNodesQueryHookResult = ReturnType<typeof useLastItemsBeforeUseNodesQuery>;
export type LastItemsBeforeUseNodesLazyQueryHookResult = ReturnType<typeof useLastItemsBeforeUseNodesLazyQuery>;
export type LastItemsBeforeUseNodesQueryResult = Apollo.QueryResult<LastItemsBeforeUseNodesQuery, LastItemsBeforeUseNodesQueryVariables>;
export const ItemDocument = gql`
    query Item($id: String!) {
  item(id: $id) {
    ...ItemFields
  }
}
    ${ItemFieldsFragmentDoc}`;

/**
 * __useItemQuery__
 *
 * To run a query within a React component, call `useItemQuery` and pass it any options that fit your needs.
 * When your component renders, `useItemQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useItemQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useItemQuery(baseOptions: Apollo.QueryHookOptions<ItemQuery, ItemQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ItemQuery, ItemQueryVariables>(ItemDocument, options);
      }
export function useItemLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ItemQuery, ItemQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ItemQuery, ItemQueryVariables>(ItemDocument, options);
        }
export type ItemQueryHookResult = ReturnType<typeof useItemQuery>;
export type ItemLazyQueryHookResult = ReturnType<typeof useItemLazyQuery>;
export type ItemQueryResult = Apollo.QueryResult<ItemQuery, ItemQueryVariables>;
export const UsersDocument = gql`
    query Users {
  users {
    ...MeFields
  }
}
    ${MeFieldsFragmentDoc}`;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
export const RolesDocument = gql`
    query Roles {
  roles {
    ...RoleFields
  }
}
    ${RoleFieldsFragmentDoc}`;

/**
 * __useRolesQuery__
 *
 * To run a query within a React component, call `useRolesQuery` and pass it any options that fit your needs.
 * When your component renders, `useRolesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRolesQuery({
 *   variables: {
 *   },
 * });
 */
export function useRolesQuery(baseOptions?: Apollo.QueryHookOptions<RolesQuery, RolesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RolesQuery, RolesQueryVariables>(RolesDocument, options);
      }
export function useRolesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RolesQuery, RolesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RolesQuery, RolesQueryVariables>(RolesDocument, options);
        }
export type RolesQueryHookResult = ReturnType<typeof useRolesQuery>;
export type RolesLazyQueryHookResult = ReturnType<typeof useRolesLazyQuery>;
export type RolesQueryResult = Apollo.QueryResult<RolesQuery, RolesQueryVariables>;
export const GetUploadUrlDocument = gql`
    query GetUploadUrl($imageFormat: String!) {
  getUploadUrl(imageFormat: $imageFormat)
}
    `;

/**
 * __useGetUploadUrlQuery__
 *
 * To run a query within a React component, call `useGetUploadUrlQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUploadUrlQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUploadUrlQuery({
 *   variables: {
 *      imageFormat: // value for 'imageFormat'
 *   },
 * });
 */
export function useGetUploadUrlQuery(baseOptions: Apollo.QueryHookOptions<GetUploadUrlQuery, GetUploadUrlQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUploadUrlQuery, GetUploadUrlQueryVariables>(GetUploadUrlDocument, options);
      }
export function useGetUploadUrlLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUploadUrlQuery, GetUploadUrlQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUploadUrlQuery, GetUploadUrlQueryVariables>(GetUploadUrlDocument, options);
        }
export type GetUploadUrlQueryHookResult = ReturnType<typeof useGetUploadUrlQuery>;
export type GetUploadUrlLazyQueryHookResult = ReturnType<typeof useGetUploadUrlLazyQuery>;
export type GetUploadUrlQueryResult = Apollo.QueryResult<GetUploadUrlQuery, GetUploadUrlQueryVariables>;