import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type AuthKeySpecifier = ('accessToken' | 'refreshToken' | 'user' | AuthKeySpecifier)[];
export type AuthFieldPolicy = {
	accessToken?: FieldPolicy<any> | FieldReadFunction<any>,
	refreshToken?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type InviteKeySpecifier = ('activate' | 'aliasTenant' | 'createdAt' | 'createdById' | 'email' | 'id' | 'link' | InviteKeySpecifier)[];
export type InviteFieldPolicy = {
	activate?: FieldPolicy<any> | FieldReadFunction<any>,
	aliasTenant?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	createdById?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	link?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ItemKeySpecifier = ('assignee' | 'baseState' | 'createdAt' | 'createdBy' | 'description' | 'dueDate' | 'id' | 'itemState' | 'title' | 'updatedAt' | 'updatedBy' | ItemKeySpecifier)[];
export type ItemFieldPolicy = {
	assignee?: FieldPolicy<any> | FieldReadFunction<any>,
	baseState?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	createdBy?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	dueDate?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	itemState?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedBy?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ItemEdgeKeySpecifier = ('cursor' | 'node' | ItemEdgeKeySpecifier)[];
export type ItemEdgeFieldPolicy = {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationKeySpecifier = ('activateUser' | 'addRole' | 'bootstrapTenant' | 'changePassword' | 'confirmTenant' | 'createInvite' | 'createItem' | 'deactivateUser' | 'decodeInviteToken' | 'deleteInvite' | 'deleteItem' | 'deleteRole' | 'login' | 'refreshToken' | 'resendConfirmationLink' | 'signup' | 'updateItem' | 'updateProfile' | 'updateRole' | 'updateUserRole' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	activateUser?: FieldPolicy<any> | FieldReadFunction<any>,
	addRole?: FieldPolicy<any> | FieldReadFunction<any>,
	bootstrapTenant?: FieldPolicy<any> | FieldReadFunction<any>,
	changePassword?: FieldPolicy<any> | FieldReadFunction<any>,
	confirmTenant?: FieldPolicy<any> | FieldReadFunction<any>,
	createInvite?: FieldPolicy<any> | FieldReadFunction<any>,
	createItem?: FieldPolicy<any> | FieldReadFunction<any>,
	deactivateUser?: FieldPolicy<any> | FieldReadFunction<any>,
	decodeInviteToken?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteInvite?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteItem?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteRole?: FieldPolicy<any> | FieldReadFunction<any>,
	login?: FieldPolicy<any> | FieldReadFunction<any>,
	refreshToken?: FieldPolicy<any> | FieldReadFunction<any>,
	resendConfirmationLink?: FieldPolicy<any> | FieldReadFunction<any>,
	signup?: FieldPolicy<any> | FieldReadFunction<any>,
	updateItem?: FieldPolicy<any> | FieldReadFunction<any>,
	updateProfile?: FieldPolicy<any> | FieldReadFunction<any>,
	updateRole?: FieldPolicy<any> | FieldReadFunction<any>,
	updateUserRole?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PageInfoKeySpecifier = ('endCursor' | 'hasNextPage' | 'hasPreviousPage' | 'startCursor' | PageInfoKeySpecifier)[];
export type PageInfoFieldPolicy = {
	endCursor?: FieldPolicy<any> | FieldReadFunction<any>,
	hasNextPage?: FieldPolicy<any> | FieldReadFunction<any>,
	hasPreviousPage?: FieldPolicy<any> | FieldReadFunction<any>,
	startCursor?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaginatedItemsKeySpecifier = ('edges' | 'nodes' | 'pageInfo' | 'totalCount' | PaginatedItemsKeySpecifier)[];
export type PaginatedItemsFieldPolicy = {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	nodes?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ProfileKeySpecifier = ('email' | 'firstname' | 'lastname' | 'locale' | 'phoneNumber' | 'photo' | 'user' | ProfileKeySpecifier)[];
export type ProfileFieldPolicy = {
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	firstname?: FieldPolicy<any> | FieldReadFunction<any>,
	lastname?: FieldPolicy<any> | FieldReadFunction<any>,
	locale?: FieldPolicy<any> | FieldReadFunction<any>,
	phoneNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	photo?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('getUploadUrl' | 'invite' | 'invites' | 'item' | 'items' | 'me' | 'roles' | 'users' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	getUploadUrl?: FieldPolicy<any> | FieldReadFunction<any>,
	invite?: FieldPolicy<any> | FieldReadFunction<any>,
	invites?: FieldPolicy<any> | FieldReadFunction<any>,
	item?: FieldPolicy<any> | FieldReadFunction<any>,
	items?: FieldPolicy<any> | FieldReadFunction<any>,
	me?: FieldPolicy<any> | FieldReadFunction<any>,
	roles?: FieldPolicy<any> | FieldReadFunction<any>,
	users?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RoleKeySpecifier = ('id' | 'name' | 'permissions' | RoleKeySpecifier)[];
export type RoleFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	permissions?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TokenKeySpecifier = ('accessToken' | 'refreshToken' | TokenKeySpecifier)[];
export type TokenFieldPolicy = {
	accessToken?: FieldPolicy<any> | FieldReadFunction<any>,
	refreshToken?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserKeySpecifier = ('baseState' | 'createdAt' | 'createdBy' | 'id' | 'items' | 'profile' | 'role' | 'updatedAt' | 'updatedBy' | 'username' | UserKeySpecifier)[];
export type UserFieldPolicy = {
	baseState?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	createdBy?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	items?: FieldPolicy<any> | FieldReadFunction<any>,
	profile?: FieldPolicy<any> | FieldReadFunction<any>,
	role?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedBy?: FieldPolicy<any> | FieldReadFunction<any>,
	username?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StrictTypedTypePolicies = {
	Auth?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AuthKeySpecifier | (() => undefined | AuthKeySpecifier),
		fields?: AuthFieldPolicy,
	},
	Invite?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | InviteKeySpecifier | (() => undefined | InviteKeySpecifier),
		fields?: InviteFieldPolicy,
	},
	Item?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ItemKeySpecifier | (() => undefined | ItemKeySpecifier),
		fields?: ItemFieldPolicy,
	},
	ItemEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ItemEdgeKeySpecifier | (() => undefined | ItemEdgeKeySpecifier),
		fields?: ItemEdgeFieldPolicy,
	},
	Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		fields?: MutationFieldPolicy,
	},
	PageInfo?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PageInfoKeySpecifier | (() => undefined | PageInfoKeySpecifier),
		fields?: PageInfoFieldPolicy,
	},
	PaginatedItems?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaginatedItemsKeySpecifier | (() => undefined | PaginatedItemsKeySpecifier),
		fields?: PaginatedItemsFieldPolicy,
	},
	Profile?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ProfileKeySpecifier | (() => undefined | ProfileKeySpecifier),
		fields?: ProfileFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	Role?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RoleKeySpecifier | (() => undefined | RoleKeySpecifier),
		fields?: RoleFieldPolicy,
	},
	Token?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TokenKeySpecifier | (() => undefined | TokenKeySpecifier),
		fields?: TokenFieldPolicy,
	},
	User?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserKeySpecifier | (() => undefined | UserKeySpecifier),
		fields?: UserFieldPolicy,
	}
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;