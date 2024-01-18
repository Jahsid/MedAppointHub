import React from 'react';
import { Link } from 'react-router-dom';


const DashboardData = ({ data }) => {
    return (
        data && (
            <div className=''>
                <div className='flex flex-col'>
                    <div className='flex flex-row justify-center'>

                        <div className='w-64 h-20 m-10 rounded-md bg-gradient-to-r from-blue-500 to-green-500 text-white text-center text-2xl'>

                            <Link to={'/doctor/slots'}>
                                Slots Created :
                                <div>
                                    {data.totalSlotCount} times
                                </div>
                            </Link>
                        </div>
                        <div className='w-64 h-20 m-10 rounded-md bg-gradient-to-r from-blue-500 to-green-500 text-white text-center text-2xl'>
                            Total Revenue :
                            <div>
                                {data.seventyPercent}
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    );
};

export default DashboardData;
