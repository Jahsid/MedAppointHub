import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStethoscope, } from '@fortawesome/free-solid-svg-icons';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { medicineDetails } from '../../../Api/userApi';


const Prescription = () => {
    const location = useLocation();
    const { name, age, email, mobile } = useSelector((state) => state.reducer.userReducer.user);
    const [medicine, setMedicine] = useState([])
    const { data } = location.state || {}
    const pdfRef = useRef();
    const date = new Date();
    const formattedDate = date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });


    const downloadPdf = () => {
        try {
            const input = pdfRef.current;
            html2canvas(input).then((canvas) => {
                const imageData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'mm', 'a4', true);
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = pdf.internal.pageSize.getHeight();
                const imageWidth = canvas.width;
                const imageHeight = canvas.height;
                const aspectRatio = imageWidth / imageHeight;

                // Calculate the width and height to maintain aspect ratio within the PDF
                let imgWidth = pdfWidth;
                let imgHeight = pdfWidth / aspectRatio;

                // If the calculated height is greater than the PDF height, reset the dimensions
                if (imgHeight > pdfHeight) {
                    imgHeight = pdfHeight;
                    imgWidth = pdfHeight * aspectRatio;
                }

                const imageX = (pdfWidth - imgWidth) / 2;
                const imageY = (pdfHeight - imgHeight) / 2;

                pdf.addImage(imageData, "PNG", imageX, imageY, imgWidth, imgHeight);
                pdf.save('Prescription.pdf');
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        medicineDetails(data._id).then((res) => {
            setMedicine(res?.data?.result)
        }).catch((error) => {
            console.log(error);
        })
    }, [])



    return (
        <>
            <div className='bg-blue-50 min-h-screen p-5 '>
                <div className='flex justify-center' >
                    <div className='bg-white min-h-screen mt-10  w-[900px]' ref={pdfRef} >
                        <div className='bg-emerald-500 h-32 w-full '>
                            <h1 className='text-3xl text-white font-bold text-center p-10'>
                                MedAppointHub ONLINE  <FontAwesomeIcon icon={faStethoscope} />
                                <p className='text-lg underline'>Prescription</p>

                            </h1>
                        </div>
                        <br />
                        <h1 className='p-5 text-blue-500'> Date :  {formattedDate}</h1>
                        <div className='m-5 border'>
                            <hr />
                        </div>
                        <div className='m-5 text-black'>
                            DOCTOR DETAILS
                        </div>
                        <div className=''>

                            <div className='m-5'>
                                <h1>DR : {data.doctorDetails.name}</h1>
                                <h1>speciality : {data.doctorDetails.speciality}</h1>
                                <h1>Mobile : {data.doctorDetails.mobile}</h1>
                                <h1>Email : {data.doctorDetails.email}</h1>
                            </div>


                        </div>

                        <div className='m-5 border'>
                            <hr />
                        </div>

                        <div className='m-5 text-black'>
                            PATIENT DETAILS
                        </div>
                        <div className='m-5'>
                            <h1>Name : {name} </h1>
                            <h1>Age : {age}</h1>
                            <h1>Mobile : {mobile}</h1>
                            <h1>Email : {email}</h1>
                        </div>

                        <div className='m-5 border'>
                            <hr />
                        </div>

                        <div className='m-5 text-black'>
                            <h1>MEDICINE</h1>
                        </div>


                        <div className='m-5'>
                            {medicine.length > 0 ? (
                                medicine.map((med, index) => (
                                    <div key={med.appointmentId}>
                                        <p className='text-green-500'>Date: {med.createdAt}</p>

                                        {med.medicines.map((m, index) => (
                                            <div key={index} className='border border-black m-5 p-5'>
                                                <h1>Medicine : {m.medicine}</h1>
                                                <h1>Duration : {m.duration} days</h1>
                                                <h1>Frequency : {m.frequency} times per day</h1>
                                            </div>
                                        ))}
                                        <h3 className='text-lg text-black'>Note:
                                            <p className='text-blue-500'>
                                                {med.note}
                                            </p>
                                        </h3>

                                        <div className='m-5 border'>
                                            <hr />
                                        </div>
                                    </div>


                                ))
                            ) : (
                                <p className='text-red-500'>No medicine added yet.</p>
                            )}
                        </div>



                    </div>
                </div >


                <div className='flex justify-center p-10 '>
                    {medicine.length > 0 && (
                        < button className='btn btn-success' onClick={downloadPdf}>DOWNLOAD PDF</button>
                    )}
                </div>

            </div >
        </ >
    )
}


export default Prescription