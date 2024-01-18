import React from 'react'
import Header from '../../../Components/UserComponents/Header/Header';
import Footer from '../../../Components/UserComponents/Footer/Footer';
import ConsultationReport from '../../../Components/UserComponents/ConsultationReport/ConsultationReport';


const ConsultationReportPage = () => {
    return (
        <div>
            <Header />
            <div className='min-h-screen bg-blue-50'>
                <ConsultationReport />
            </div>
            <Footer />
        </div>
    )
}

export default ConsultationReportPage

