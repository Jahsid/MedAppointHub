import { Navigate } from 'react-router-dom';

 const UserPublic = (props) => {
  try {
    const token =  localStorage.getItem('usertoken');
    if(token){
      return <Navigate to='/'/>;
    }else{
      <Navigate to='/'/>;
      return props.children;
    }
  } catch (error) {
    console.log(error.message);
  }
};
export default UserPublic;