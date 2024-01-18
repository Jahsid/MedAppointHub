import {Navigate} from 'react-router-dom';

function UserProtect(props){
    if(localStorage.getItem('usertoken')){
        return props.children;
    }else{
        return <Navigate to='/' />;
    }
}

export default UserProtect;