const config = {
  config: {
    withHooks: true,
    withComponent: false,
    withHOC: false,
    useTypenameImports: true,
    onlyOperationTypes: true,
    scalars: {
      ID: 'string',
      String: 'string',
      Boolean: 'boolean',
      Int: 'number',
      Float: 'number',
      AccountNumber: 'string',
      BigInt: 'number',
      Date: 'string',
      DateTime: 'string',
      EmailAddress: 'string',
      JSON: 'Record<string, any>',
      JSONObject: 'Record<string, any>',
      JWT: 'string',
      Locale: 'string',
      LocalDate: 'string',
      LocalEndTime: 'string',
      LocalTime: 'string',
      NegativeFloat: 'number',
      NegativeInt: 'number',
      NonEmptyString: 'string',
      NonNegativeFloat: 'number',
      NonNegativeInt: 'number',
      NonPositiveFloat: 'number',
      NonPositiveInt: 'number',
      ObjectID: 'string',
      PositiveFloat: 'number',
      PositiveInt: 'number',
      SafeInt: 'number',
      SemVer: 'string',
      Time: 'string',
      TimeZone: 'string',
      Timestamp: 'string',
      URL: 'string',
      UUID: 'string',
      Void: 'void'
    }
  },
  plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo']
};
/** @type {import('graphql-config').IGraphQLConfig } */
module.exports = {
  projects: {
    'apps-web-client': {
      schema: 'apps/api/src/schema.graphql',
      documents: 'libs/utils/api-client/src/data-access/graphql/*.graphql',
      extensions: {
        codegen: {
          overwrite: true,
          generates: {
            'libs/utils/api-client/src/generated/types.generated.ts': config,
            'libs/utils/api-client/src/generated/apollo-helpers.ts': {
              plugins: ['typescript-apollo-client-helpers']
            }
          }
        }
      },
      hooks: { afterAllFileWrite: ['prettier --write'] }
    },
    'apps-web-tenant-admin': {
      schema: 'apps/api-tenant/src/schema.graphql',
      documents: 'libs/utils/api-tenant/src/data-access/graphql/*.graphql',
      extensions: {
        codegen: {
          overwrite: true,
          generates: {
            'libs/utils/api-tenant/src/generated/types.generated.ts': config,
            'libs/utils/api-tenant/src/generated/apollo-helpers.ts': {
              plugins: ['typescript-apollo-client-helpers']
            }
          }
        }
      },
      hooks: { afterAllFileWrite: ['prettier --write'] }
    }
  }
};
