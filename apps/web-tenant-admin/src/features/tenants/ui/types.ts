import { TenantFieldsFragment } from '@cnask/utils/api-tenant';

export type ViewProps = {
  data: TenantFieldsFragment[];
  onDelete: (value: TenantFieldsFragment) => void;
  onUpdate: (value: TenantFieldsFragment) => void;
  onBootstrap: (value: TenantFieldsFragment) => void;
  loadingState: Record<string, boolean | undefined>;
};

export type ViewItemProps = {
  value: TenantFieldsFragment;
  onDelete: (value: TenantFieldsFragment) => void;
  onUpdate: (value: TenantFieldsFragment) => void;
  loading: boolean | undefined;
};
