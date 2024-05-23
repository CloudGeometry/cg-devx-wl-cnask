import { FabAddButton } from '@cnask/shared/ui';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export function TenantAdd() {
  const navigate = useNavigate();
  const onAdd = useCallback(() => {
    navigate('/tenants/new');
  }, [navigate]);

  return <FabAddButton onClick={onAdd} />;
}
