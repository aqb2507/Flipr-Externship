import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import { useEffect } from 'react';
import Navbar from '../pages/admin/Navbar';

export default function Admin(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    if (user && isSuccess) {
      navigate('/');
    }
    if (user.role !== 'Admin') {
      navigate('/login');
    }
  }, [user, isSuccess, isLoading, isError, message, navigate, dispatch]);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/login');
  };

  const navigation = [
    { name: 'Dashboard', href: './dashboard', current: props.dashboard },
    { name: 'Employees', href: './employees', current: props.employees },
  ];

  return (
    <>
      <div className="min-h-full">
        <Navbar navigation={navigation} onLogout={onLogout} user={user} />
        <div className="component min-h-screen">{props.AdminComponent}</div>
      </div>
    </>
  );
}
