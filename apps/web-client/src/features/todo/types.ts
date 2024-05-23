type ItemActions<T> = {
  onStateToggle: (item: T) => void;
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
};

type ItemsLoading = {
  loadingState: Record<string, boolean | undefined>;
};

export type ItemProps<T> = {
  value: T;
  loading?: boolean;
} & ItemActions<T>;

export type ItemsViewProps<T> = {
  data?: T[];
  loading?: boolean;
} & ItemActions<T> &
  ItemsLoading;

export enum BaseState {
  Active = 'ACTIVE',
  Deleted = 'DELETED'
}
