import { FabAddButton } from '@cnask/shared/ui';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AbilityContext } from '@cnask/casl/feature';
import { useAbility } from '@casl/react';

export function TodoAdd() {
  const navigate = useNavigate();
  const onAdd = useCallback(() => {
    navigate('/todo/new');
  }, [navigate]);
  const ability = useAbility(AbilityContext);

  if (!ability.can('create', 'Item')) {
    return null;
  }

  return <FabAddButton onClick={onAdd} />;
}

export default TodoAdd;
