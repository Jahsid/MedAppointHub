import React, { useEffect, useState } from "react";
import SideNav from "../../../Components/AdminComponents/SideNav/SideNav";
import Header from "../../../Components/AdminComponents/Header/Header";
import Footer from "../../../Components/AdminComponents/Footer/Footer";
import { counts, adminReport } from "../../../Api/adminApi";
import LineChart from "../../../Components/AdminComponents/LineChart/LineChart";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [reportData, setReportData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCount = async () => {
      try {
        const res = await counts();
        setData(res?.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    const getReport = async () => {
      try {
        setLoading(true);
        const report = await adminReport();
        setReportData(report?.data);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    getCount();
    getReport();
  }, []);

  return (
    <>
      <Header />
      <div className="flex">
        <SideNav />
        {loading ? (
          <div className="flex justify-center w-full min-h-screen">
            <span className="loading loading-ring loading-lg"></span>
          </div>
        ) : (
          <div>
            {data && (
              <div className="flex flex-col">
                <div className="flex flex-row justify-center">
                  <div className="w-64 h-20 m-10 rounded-md bg-gradient-to-r from-blue-500 to-green-500 text-white text-center text-2xl">
                    Doctors Count:
                    <div>{data.doctor}</div>
                  </div>
                  <div className="w-64 h-20 m-10 rounded-md bg-gradient-to-r from-blue-500 to-green-500 text-white text-center text-2xl">
                    Users Count:
                    <div>{data.user}</div>
                  </div>

                  <div className="w-64 h-20 m-10 rounded-md bg-gradient-to-r from-blue-500 to-green-500 text-white text-center text-2xl">
                    Admin Revenue:
                    <div>{data.thirtyPercent}</div>
                  </div>
                  <div className="w-64 h-20 m-10 rounded-md bg-gradient-to-r from-blue-500 to-green-500 text-white text-center text-2xl">
                    Total Revenue:
                    <div>{data.total}</div>
                  </div>
                </div>
              </div>
            )}
            {reportData && (
              <div className="w-full min-h-screen">
                <LineChart
                  usersByYear={reportData?.usersData}
                  doctorsByYear={reportData?.doctorsData}
                />
              </div>
            ) }
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Dashboard;
