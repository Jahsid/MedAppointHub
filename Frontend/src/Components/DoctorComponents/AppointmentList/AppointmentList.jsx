import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { appointmentList } from '../../../Api/doctorApi';
import { Button, Modal } from 'flowbite-react';
import { useNavigate, Link } from 'react-router-dom';
import { createChat } from '../../../Api/doctorApi'
import Swal from 'sweetalert2';
import { markasDone, appoReschedule } from '../../../Api/doctorApi';
import { useFormik } from 'formik';
import { rescheduleSchema } from '../../../validations/doctor/rescheduleValidation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComment, faVideo, faCheck, faPrescriptionBottleMedical, faNotesMedical,
} from '@fortawesome/free-solid-svg-icons';
import { cancelAppointment } from '../../../Api/doctorApi';


const AppointmentList = () => {
  const navigate = useNavigate();
  const [appo, setAppo] = useState([]);
  const [pagination, setPagination] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const doctor = useSelector((state) => state.reducer);
  const doctorData = doctor.doctorReducer.doctor;
  const id = doctorData._id;
  const [userId, setUserId] = useState()
  const [appoDate, setAppoDate] = useState()
  const [appoStart, setAppoStart] = useState()
  const [appoEnd, setAppoEnd] = useState()
  const [appoName, setAppoName] = useState()
  const [appoId, setAppoId] = useState()
  const [appoStatus, setAppoStauts] = useState()
  const [btn, setBtn] = useState(false);
  const [openModalx, setOpenModalx] = useState(false);
  const [currentDate, setCurrentDate] = useState();
  const [currentTime, setCurrentTime] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [paymentId, setPaymentId] = useState()


  const limit = 5;
  const appoDateAsDate = new Date(appoDate);
  const appDate = appoDateAsDate.toLocaleDateString();
  const currDateAsDate = new Date(currentDate);
  const currDate = currDateAsDate.toLocaleDateString();
  const [render, setRender] = useState(false)

  const [openModalR, setOpenModalR] = useState(false);



  useEffect(() => {
    appointmentList(id, currentPage, limit)
      .then((res) => {
        setAppo(res.data.data);
        setPagination(res?.data?.pagination);
        setCurrentDate(res?.data?.currentDate);
        setCurrentTime(res?.data?.currentTime);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [id, currentPage, limit, render]);


  const handleId = (id) => {
    setUserId(id)
  }

  const handleClick = (date, start, end, name, id, status, payment) => {

    setAppoDate(date)
    setAppoStart(start)
    setAppoEnd(end)
    setAppoName(name)
    setAppoId(id)
    setAppoStauts(status)
    setPaymentId(payment)
  }

  const handleAccept = async () => {
    try {
      const response = await createChat({ userid: userId, doctorid: id });
      setBtn(true);
      Swal.fire(response?.data?.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleNavigate = () => {
    try {
      navigate('/doctor/chatpagedoctor');
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleLinkClick = (event) => {
    event.preventDefault();

    const baseUrl = '/doctor/video';

    // Append the userId as a query parameter
    const urlToOpen = `${baseUrl}?userId=${userId}`;

    // Open the URL in a new tab
    window.open(urlToOpen, '_blank');
  };

  const handlePris = () => {
    navigate(`/doctor/priscription`, {
      state: {
        userName: appoName, date: appDate, start: appoStart, end: appoEnd, userId: userId, appoId: appoId
      }
    })
  }

  const handleReport = () => {
    navigate(`/doctor/medicalreport`, {
      state: {
        userName: appoName, date: appDate, appoId: appoId, userId: userId
      }
    })
  }

  const markAsDone = async () => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to undo this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes!"
      });

      if (result.isConfirmed) {
        const res = await markasDone(appoId, userId);
        if (res.status === 200) {
          if (render === true) {
            setRender(false)
            setOpenModal(false)
          } else {
            setRender(true)
            setOpenModal(false)
          }
          Swal.fire({
            title: "Appointment marked as DONE!",
            icon: "success"
          });
        } else {
          Swal.fire({
            title: "Error",
            icon: "error"
          });
        }

      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const onSubmit = async (values) => {
    try {
      const { date, startTime, endTime } = values;
      const res = await appoReschedule({ date, startTime, endTime, appoId, userId });

      if (res.status === 200) {
        if (render === true) {
          setRender(false)
          setOpenModalR(false)
          setOpenModal(false)
          const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
          });

          Toast.fire({
            icon: 'success',
            title: res.data.message,
          });
        } else {
          setRender(true)
          setOpenModalR(false)
          setOpenModal(false)
          const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
          });

          Toast.fire({
            icon: 'success',
            title: res.data.message,
          });
        }

      }

    } catch (error) {
      console.log(error.message);

    }
  };


  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: {
      date: '',
      startTime: '',
      endTime: '',
    },
    validationSchema: rescheduleSchema,
    onSubmit,
  });

  const handleCancel = async () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, cancel it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          setOpenModal(false)
          await cancelAppointment({ appoId, paymentId, userId });
          Swal.fire({
            title: "Cancelled!",
            text: "Your appointment has been cancelled.",
            icon: "success",
          });
          if (render === true) {
            setRender(false);
          } else {
            setRender(true);
          }
        }
      });


    } catch (error) {
      console.log(error.message);
    }
  }


  return (
    <div>
      <br />
      <div className='text-center underline text-2xl text-black'>
        <h1>Appointment List</h1>
      </div>
      <br />
      <div className='flex justify-center'>
        <div className='w-full lg:w-[1000px] bg-white min-h-[600px] rounded shadow-xl overflow-hidden'>
          {appo.length === 0 ? (
            <div className="text-center p-4  text-gray-600">
              No appointments available.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead className='bg-green-400 rounded h-16'>
                  <tr className="text-black">
                    <th className="py-2">No</th>
                    <th className="py-2">User</th>
                    <th className="py-2">Appo.Date</th>
                    <th className="py-2">Booked Date</th>
                    <th className="py-2">Starting Time</th>
                    <th className="py-2">Ending Time</th>
                    <th className="py-2">Status</th>
                    <th className="py-2">More</th>
                  </tr>
                </thead>
                <tbody>
                  {appo.map((appointment, index) => (
                    <tr key={appointment._id} className="text-black">
                      <td className="py-2">{index + 1}</td>
                      <td className="py-2">{appointment.userDetails.name}</td>
                      <td className="py-2 text-blue-600">{appointment.consultationDate}</td>
                      <td className="py-2">{appointment.createdAt}</td>
                      <td className="py-2">{appointment.start}</td>
                      <td className="py-2">{appointment.end}</td>
                      <td className={`py-2 ${appointment.status === 'Done' ? 'text-green-500' :
                        appointment.status === 'Cancelled' ? 'text-red-600' :
                          appointment.status === 'CancelledByDoctor' ? 'text-red-600' :
                            appointment.status === 'Pending' ? 'text-yellow-300' : ''}`}
                      >
                        {appointment.status}
                      </td>


                      <td
                        onClick={() => {
                          setOpenModal(true);
                          handleId(appointment.userDetails._id);
                          handleClick(appointment.consultationDate, appointment.start, appointment.end, appointment.userDetails.name, appointment._id, appointment.status, appointment.paymentId, appointment.user)

                        }}
                        className="py-2 text-cyan-500"
                      >
                        more
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      {pagination && pagination.totalPages && (
        <div className="flex justify-center mt-4 bg-blue-50">
          {Array.from({ length: pagination.totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`pagination-btn border w-10 ${index + 1 === currentPage ? "border-black" : "border-gray-300"}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>More info</Modal.Header>
        <Modal.Body>
          {appoStatus === "CancelledByDoctor" ? (
            <div className='text-red-500 p-5'>
              APPOINTMENT CANCELLED BY DOCTOR
            </div>
          ) : (
            <div className="space-y-6">
              {currDate === appDate && currentTime >= appoStart && currentTime <= appoEnd && appoStatus === "Pending" ? (
                <React.Fragment>
                  <p className='text-xl text-green-500 '>
                    Now you can start the video call
                  </p>
                  <Link to={'/doctor/video'} className='btn btn-secondary w-full' onClick={handleLinkClick}>
                    Start Video Call<FontAwesomeIcon icon={faVideo} />
                  </Link>
                </React.Fragment>
              ) : (
                appoStatus === "Done" ? (
                  <React.Fragment>
                    <div className='text-green-500'>
                      ADD MEDICAL REPORT AND PRESCRIPTION
                    </div>
                  </React.Fragment>
                ) : (
                  appoStatus === "Cancelled" ? (
                    <div className='text-red-500 pt-5'>
                      APPOINTMENT CANCELLED BY USER
                    </div>
                  ) : (
                    <div className='text-orange-500'>
                      VIDEO CALL ROOM AVAILABLE IN THE DATE AND TIME
                    </div>
                  )
                )
              )}
              <br />
              {appoStatus === "Done" && (
                <React.Fragment>
                  <button onClick={() => { setOpenModal(false); handlePris(); }} className='btn btn-primary w-full'>
                    Add Prescription<FontAwesomeIcon icon={faPrescriptionBottleMedical} />
                  </button>
                  <br />
                  <button onClick={() => { setOpenModal(false); handleReport() }} className='btn btn-success w-full'>
                    Add Medical Report<FontAwesomeIcon icon={faNotesMedical} />
                  </button>
                  <br />
                </React.Fragment>
              )}
              {currDate === appDate && currentTime >= appoStart && appoStatus === "Pending" ? (
                <button className='btn btn-warning w-full' onClick={markAsDone}>
                  Mark As Done<FontAwesomeIcon icon={faCheck} />
                </button>
              ) : null}
            </div>
          )}
        </Modal.Body>

        <Modal.Footer>
          {appoStatus === "Cancelled" || appoStatus === "CancelledByDoctor" ? null : (
            btn ? (
              <div className="flex justify-center">
                <Button
                  color='green'
                  className="w-44"
                  onClick={() => handleNavigate()}
                >
                  Chat with patient
                </Button>
              </div>
            ) : (
              <div className="flex justify-center">
                <Button className='w-48' color='green' onClick={() => setOpenModalx(true)}>
                  Connect patient
                </Button>
              </div>
            )
          )}
          {appoStatus === "Cancelled" || appoStatus === "Done" || appoStatus === "CancelledByDoctor" ? null : (
            <>
              <Button className='w-48' color='yellow' onClick={() => setOpenModalR(true)}>Reschedule</Button>
              <Button onClick={handleCancel} color='red' className='w-48'>
                Cancel appointment
              </Button>
            </>
          )}
        </Modal.Footer>


      </Modal>




      <Modal show={openModalR} onClose={() => setOpenModalR(false)}>
        <Modal.Header>Reschedule</Modal.Header>
        <Modal.Body>
          <form method="dialog" onSubmit={handleSubmit} className="modal-form">

            <div className="form-group text-black">
              <label htmlFor="date">New Date:</label>
              <input
                className='w-full bg-gray-300'
                type="date"
                id="date"
                name="date"
                value={values.date}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.date && touched.date && (
                <p className='text-red-600'>{errors.date}</p>
              )}
            </div>

            <div className="form-group text-black">
              <label htmlFor="startTime">Start Time:</label>
              <input
                className='w-full bg-gray-300'
                type="time"
                id="startTime"
                name="startTime"
                value={values.startTime}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.startTime && touched.startTime && (
                <p className='text-red-600'>{errors.startTime}</p>
              )}
            </div>

            <div className="form-group text-black">
              <label htmlFor="endTime">End Time:</label>
              <input
                className='w-full bg-gray-300'
                type="time"
                id="endTime"
                name="endTime"
                value={values.endTime}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.endTime && touched.endTime && (
                <p className='text-red-600'>{errors.endTime}</p>
              )}
            </div>
            <br />
            <Button type="submit" >Submit</Button>
          </form>
        </Modal.Body>
      </Modal>


      <Modal show={openModalx} onClose={() => setOpenModalx(false)}>
        <Modal.Header>Connect Patient</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div className='flex justify-center'>
              <div className="relative group cursor-pointer group overflow-hidden  text-gray-50 h-72 w-56  rounded-2xl hover:duration-700 duration-700">
                <div className="w-56 h-72 bg-emerald-400 text-gray-800">
                  <div className="flex flex-row justify-center">
                    <FontAwesomeIcon icon={faComment} className=' m-10 w-20 h-20 ' />
                  </div>
                </div>
                <div className="absolute bg-black -bottom-24 w-56 p-3 flex flex-col gap-1 group-hover:-bottom-0 group-hover:duration-600 duration-500">
                  <span className="text-white font-bold text-xs">CONNECT</span>
                  <span className="text-white font-bold text-3xl">With patiant.</span>
                  <p className="text-white">Click I accept to connect with patient</p>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            color="gray"
            onClick={() => {
              setOpenModalx(false);
              handleAccept();
            }}
          >
            I accept
          </Button>

          <Button onClick={() => setOpenModalx(false)}>Decline</Button>
        </Modal.Footer>
      </Modal>

    </div >

  );
};


export default AppointmentList;