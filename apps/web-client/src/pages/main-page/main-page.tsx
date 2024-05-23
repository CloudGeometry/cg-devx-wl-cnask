import { Navigate } from 'react-router-dom';

export function MainPage() {
  return <Navigate to={'/todo'} />;
}

export default MainPage;
