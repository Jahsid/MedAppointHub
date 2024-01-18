import React, { useState, useEffect } from 'react';
import { userList } from '../../../Api/adminApi';
import { userDetails, userBlockUnblock } from '../../../Api/adminApi';


export const UserList = () => {
  const [loading,setLoading] = useState(false)
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    setLoading(true)
    userList(currentPage, itemsPerPage)
      .then((response) => {
        setUsers(response?.data?.users);
        setPagination(response?.data?.pagination);
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
        console.log(error.message);
      });
  }, [currentPage, itemsPerPage]);

  const handleClick = async (id) => {
    try {
      const response = await userDetails(id);
      const data = response?.data?.details;
      setUserData(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const blockUnblock = async (id) => {
    try {
      await userBlockUnblock(id);
      const res = await userDetails(id);
      setUserData(res?.data?.details);
    } catch (error) {
      console.log(error.message);
    }
  };



  return (
    <>
   {loading ? (
        <div className=" flex justify-center min-h-screen ">
          <span className="loading loading-ring loading-lg"></span>
        </div>
      ) : (
        <div>
          <div className="text-sm breadcrumbs">
            <ul>
              <li><a href="/">DASHBOARD</a></li>
              <li><a>USER LIST</a></li>
            </ul>
          </div>
          <div>
            {users.length === 0 ? (
              <div className='flex justify-center text-2xl text-yellow-200'>
                <p>No Users Found.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Mobile</th>
                      <th>More</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr key={index} className="hover">
                        <th>{index + 1}</th>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.mobile}</td>
                        <td>
                          <button type='button' onClick={() => { document.getElementById('my_modal_3').showModal(); handleClick(user._id); }}>
                            More Info
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {pagination && pagination.totalPages && users.length > 0 && (
            <div className="flex justify-center mt-4">
              {Array.from({ length: pagination.totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`pagination-btn border w-10 ${index + 1 === currentPage ? "border-green-400" : "border-black"}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
     


      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      < dialog id="my_modal_3" className="modal" >
        <div className="modal-box rounded-none">
          <form method="dialog">

            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            <div className="card-body">
              {userData ? (

                <>
                  <div className=''>
                    <img src={userData.photo} alt="" />
                  </div>
                  <h2 className="card-title text-3xl font-bold mb-4">{userData.name}</h2>
                  <p className="text-gray-300">Id : {userData._id}</p>
                  <p className="text-gray-300">Email : {userData.email}</p>
                  <p className="text-gray-300">Mobile : {userData.mobile}</p>
                  <p className="text-gray-300">OTP Verified : {userData.otp_verified ? 'Yes' : 'No'}</p>
                  <p className="text-gray-300">Blocked : {userData.is_blocked ? 'Yes' : 'No'}</p>
                  <p className="text-gray-300">Age : {userData.age || 'Not Added'}</p>
                  <p className="text-gray-300">Gender : {userData.gender || 'Not Added'}</p>

                  <div className="card-actions mx-[147px]">
                    <button
                      className="btn text-white"
                      onClick={() => blockUnblock(userData._id)}
                      style={{ backgroundColor: userData.is_blocked ? 'green' : 'red' }}
                    >
                      {userData.is_blocked ? 'UNBLOCK' : 'BLOCK'}
                    </button>

                  </div>
                  <br />
                </>
              ) : (
                <p>Loading user data...</p>
              )}
            </div>
          </form>
        </div>
      </dialog >


    </>
  );
};
