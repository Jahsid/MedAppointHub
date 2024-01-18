import {Navigate} from 'react-router-dom';

function DoctorProtect(props){
    if(localStorage.getItem('doctortoken')){
        return props.children;
    }else{
        return <Navigate to='/doctor/login' />;
    }
}

export default DoctorProtect;