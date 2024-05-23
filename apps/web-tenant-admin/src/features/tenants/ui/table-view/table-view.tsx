import {
  Box,
  Fade,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import TableBodyContainer from './table-body-container';
import { TenantFieldsFragment } from '@cnask/utils/api-tenant';
import { ItemActionButton } from '@cnask/shared/ui';
import { useState } from 'react';
import { ViewProps } from '../types';

export function TableView({
                            data,
                            onDelete,
                            onUpdate,
                            onBootstrap,
                            loadingState
                          }: ViewProps) {
  return (
    <TableBodyContainer>
      <TableHead sx={{ width: '100%' }}>
        <TableRow>
          <TableCell key={'alias'}>Alias</TableCell>
          <TableCell key={'status'}>Status</TableCell>
          <TableCell key={'baseState'}>State</TableCell>
          <TableCell key={'email'}>Email</TableCell>
          <TableCell key={'actions'}>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data?.map((tenant) => {
          return (
            <TenantTableRow
              key={tenant.id}
              value={tenant}
              loading={loadingState[tenant.id]}
              onDelete={onDelete}
              onUpdate={onUpdate}
              onBootstrap={onBootstrap}
            />
          );
        })}
      </TableBody>
    </TableBodyContainer>
  );
}

function TenantTableRow({
                          value,
                          loading,
                          onUpdate,
                          onDelete,
                          onBootstrap
                        }: {
  value: TenantFieldsFragment;
  loading: boolean | undefined;
  onUpdate: (value: TenantFieldsFragment) => void;
  onDelete: (value: TenantFieldsFragment) => void;
  onBootstrap: (value: TenantFieldsFragment) => void;
}) {
  const [isHovered, setHovered] = useState(false);
  return (
    <TableRow
      key={value.id}
      tabIndex={-1}
      hover
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <TableCell scope='row'>{value.alias}</TableCell>
      <TableCell scope='row'>{value.status}</TableCell>
      <TableCell scope='row'>{value.baseState}</TableCell>

      <TableCell scope='row'>{value.email}</TableCell>
      <TableCell
        align='right'
        padding='none'
      >
        <Fade in={isHovered}>
          <Box
            mx={2}
            display={'flex'}
          >
            <ItemActionButton
              type='update'
              onClick={() => onUpdate(value)}
              disabled={!!loading}
            />
            <ItemActionButton
              sx={{ ml: 1 }}
              type='start'
              onClick={() => onBootstrap(value)}
              disabled={!!loading}
            />
            <ItemActionButton
              sx={{ ml: 2 }}
              type='delete'
              disabled={!!loading}
              onClick={() => onDelete(value)}
            />
          </Box>
        </Fade>
      </TableCell>
    </TableRow>
  );
}
