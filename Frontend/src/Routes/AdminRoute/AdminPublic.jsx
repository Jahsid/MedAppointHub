import { Navigate } from 'react-router-dom';

 const AdminPublic = (props) => {
  try {
    const token =  localStorage.getItem('admintoken');
    if(token){
      return <Navigate to='/admin/dashboard'/>;
    }else{
      <Navigate to='/admin/adminlogin'/>;
      return props.children;
    }
  } catch (error) {
    console.log(error.message);
  }
};
export default AdminPublic;