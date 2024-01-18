import { Navigate } from 'react-router-dom';

 const DoctorPublic = (props) => {
  try {
    const token =  localStorage.getItem('doctortoken');
    if(token){
      return <Navigate to='/doctor/dashboard'/>;
    }else{
      <Navigate to='/doctor/doctorside'/>;
      return props.children;
    }
  } catch (error) {
    console.log(error.message);
  }
};
export default DoctorPublic;