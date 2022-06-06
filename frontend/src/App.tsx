import React, { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MainLayout } from './layouts/MainLayout';
import { Home } from './pages/Home';
import { Auth } from './pages/Auth';
import { useAppDispatch } from './store/store';
import { selectIsAuth, selectUserStatus } from './store/user/selectors';
import { findUserData } from './store/user/asyncActions';
import { withSuspense } from './hocs/withSuspense';
import { Status } from './store/types';
import './scss/app.scss';


const Cart = React.lazy(() => import('./pages/Cart'));
const FullPizza = React.lazy(() => import('./pages/FullPizza'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const Profile = React.lazy(() => import('./pages/Profile'));
const Pay = React.lazy(() => import('./pages/Pay'));
const Admin = React.lazy(() => import('./pages/Admin'));

const SuspendedCart = withSuspense(Cart);
const SuspendedFullPizza = withSuspense(FullPizza);
const SuspendedNotFound = withSuspense(NotFound);
const SuspendedProfile = withSuspense(Profile);
const SuspendedPay = withSuspense(Pay);
const SuspendedAdmin = withSuspense(Admin);

function App() {
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useAppDispatch();
	const isAuth = useSelector(selectIsAuth);
	const userStatus = useSelector(selectUserStatus);
	const isReady = userStatus !== Status.LOADING && userStatus !== Status.NEVER;

	useEffect(() => {
		dispatch(findUserData());
	}, [userStatus]);

	useEffect(() => {
		if (!isAuth && !isReady) {
			navigate('/auth', {replace: true});
		} else if (location.pathname === '/') {
			navigate('/', {replace: true});
		}
	}, [isAuth, isReady]);

	return (
		<Routes>
			<Route path="/auth" element={<Auth/>}/>
			<Route path="/pay" element={<SuspendedPay/>}/>

			<Route path="/" element={<MainLayout/>}>
				<Route path="" element={<Home/>}/>
				<Route path="cart" element={<SuspendedCart/>}/>
				<Route path="profile" element={<SuspendedProfile/>}/>
				<Route path="admin" element={<SuspendedAdmin/>}/>
				<Route path="pizza/:id" element={<SuspendedFullPizza/>}/>
				<Route path="*" element={<SuspendedNotFound/>}/>
			</Route>
		</Routes>
	);
}

export default App;
