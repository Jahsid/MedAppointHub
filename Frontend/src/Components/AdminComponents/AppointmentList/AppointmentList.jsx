import React, { useEffect, useState } from "react";
import { appointmentList } from "../../../Api/adminApi";

const AppointmentList = () => {
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    setLoading(true);
    const fetchAppointments = async () => {
      try {
        const response = await appointmentList(currentPage, itemsPerPage);
        setAppointments(response?.data?.data);
        setPagination(response?.data?.pagination); // Update pagination state
        setLoading(false);
      } catch (error) {
        console.error(error.message);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [currentPage, itemsPerPage]);

  const handleClick = () => {
    try {
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
    {
      loading ? (
        <div className="flex items-center justify-center min-h-screen w-full">
        <div className="flex flex-col items-center">
          <span className="loading loading-ring loading-lg"></span>
        </div>
      </div>
      ) : (
      <div>
        <div className="flex-grow">
          <div className="text-sm breadcrumbs">
            <ul>
              <li>
                <a>DASHBOARD</a>
              </li>
              <li>
                <a>APPOINTMENT</a>
              </li>
            </ul>
          </div>
          {appointments.length === 0 ? (
            <div className="flex justify-center text-center text-2xl text-yellow-200">
              <p>No Appointments Found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Consultation Date</th>
                    <th>Booked Date</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Status</th>
                    {/* <th>Slot ID</th> */}
                    <th>Appointment ID</th>
                    <th>Paymet ID</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((app, index) => (
                    <tr key={index} className="hover">
                      <th>{index + 1}</th>
                      <td>{app.consultationDate}</td>
                      <td>{app.createdAt}</td>
                      <td>{app.start}</td>
                      <td>{app.end}</td>
                      <td
                        className={`${
                          app.status === "Pending"
                            ? "text-yellow-200"
                            : app.status === "Done"
                            ? "text-green-500"
                            : app.status === "Cancelled"
                            ? "text-red-500"
                            : ""
                        }`}
                      >
                        {app.status}
                      </td>
                      {/* <td>{app.slotId}</td> */}
                      <td> {app._id}</td>
                      <td>{app.paymentId}</td>
                      <td>
                        <button type="button" onClick={() => handleClick()}>
                          More Info
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {pagination && pagination.totalPages && appointments.length > 0 && (
            <div className="flex justify-center mt-4 ">
              {Array.from({ length: pagination.totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`pagination-btn border w-10 ${
                    index + 1 === currentPage
                      ? "border-green-400"
                      : "border-black"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      )
    }
        
    </>
  );
};

export default AppointmentList;
