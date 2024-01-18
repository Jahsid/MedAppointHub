import React, { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStethoscope } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ConsultationReport = () => {
    const location = useLocation();
    const { data } = location.state || {};
    const { _id, name, age, email, mobile } = useSelector((state) => state.reducer.userReducer.user);
    const pdfRef = useRef();
    if (!data) {
        return <div>No data available for consultation report</div>;
    }
    console.log(data);

    const {
        consultationDate,
        createdAt,
        doctor,
        doctorDetails,
        end,
        paymentId,
        rescheduled,
        slotId,
        start,
        status,
        updatedAt,
        user,
        specialty, // assuming there's a specialty field in the data
        price, // assuming there's a price field in the data
        // add more fields as needed
    } = data;

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

    return (
        <>
            <div className='invoice-container flex justify-center p-10'>
                <div className='invoice-bg bg-white min-h-screen w-[900px] ' ref={pdfRef}>
                    <div className='invoice-header bg-emerald-500 h-32 w-full '>
                        <h1 className='text-3xl text-white font-bold text-center p-10'>
                            MedAppointHub ONLINE  <FontAwesomeIcon icon={faStethoscope} />
                            <p className='text-lg underline'>Consultation Report</p>
                        </h1>
                    </div>
                    <div className='invoice-body p-5 text-black'>
                        <h2 className='text-xl font-semibold mb-4'>Patient Details:</h2>
                        <p>Name: {name}</p>
                        <p>Age: {age}</p>
                        <p>Email: {email}</p>
                        <p>Mobile: {mobile}</p>

                        <h2 className='text-xl font-semibold my-4'>Doctor Details:</h2>
                        <p>Doctor Name: {data.doctorDetails.name}</p>
                        <p>Speciality: {data.doctorDetails.speciality}</p>
                        <p>Email: {data.doctorDetails.email}</p>
                        <p>Mobile: {data.doctorDetails.mobile}</p>

                        <h2 className='text-xl font-semibold my-4'>Consultation Details:</h2>
                        <p>Specialty: {data.doctorDetails.speciality}</p>
                        {/* <p>Price:/-</p> */}
                        <p>Booked Date: {createdAt}</p>
                        <p>Consultation Date: {consultationDate}</p>
                        <p>Rescheduled: {rescheduled ? 'Yes' : 'No'}</p>
                        {/* Add more consultation details as needed */}
                    </div>
                    <div className='invoice-header bg-yellow-100 mt-40 h-32 w-full '>
                        <div className='p-10 text-black '>
                            <p>Payment date : {createdAt}</p>
                            <h1 className=' text-2xl'>Total Price :  ₹ 299/-</h1>
                        </div>

                    </div>
                </div>
            </div>
            <div className='flex justify-center p-10 '>
                <button className='btn btn-success' onClick={downloadPdf}>DOWNLOAD PDF</button>
            </div>
        </>

    );
};

export default ConsultationReport;
