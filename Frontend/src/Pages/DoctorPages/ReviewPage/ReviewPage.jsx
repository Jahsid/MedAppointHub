import React from 'react'
import Header from '../../../Components/DoctorComponents/Header/Header';
import Footer from '../../../Components/DoctorComponents/Footer/Footer';
import Reviews from '../../../Components/DoctorComponents/Reviews/Reviews';

const ReviewPage = () => {
    return (
        <div>
            <Header />
            <div>
                <Reviews />
            </div>
            <Footer />
        </div >

    )
}

export default ReviewPage