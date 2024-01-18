import { Navigate } from 'react-router-dom';

function AdminProtect(props) {
    if (localStorage.getItem('admintoken')) {
        return props.children;
    } else {
        return <Navigate to='/admin/adminlogin' />;
    }
}

export default AdminProtect;