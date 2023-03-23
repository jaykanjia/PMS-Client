import React, { useState, useEffect } from "react";
import DashboardCard from "../../CommonComponents/dashboard/DashboardCard";
import DashTable from "../../CommonComponents/dashboard/DashTable";
import axios from "axios";
import "../../../css/dashboard.css";

const StudentDashboard = () => {
    const [dashData, setDashData] = useState([]);
    const [jobData, setJobData] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5001/api/student/fetch/dashboard", {
                headers: {
                    "auth-token": sessionStorage.getItem("auth-token"),
                },
            })
            .then((res) => {
                setDashData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    useEffect(() => {
        axios
            .get("http://localhost:5001/api/student/fetch/jobs", {
                headers: {
                    "auth-token": sessionStorage.getItem("auth-token"),
                },
            })
            .then((res) => {
                // console.log(res.data);
                setJobData(() => {
                    return res.data;
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <main>
            <div className="card-container">
                {dashData.map((data) => (
                    <DashboardCard
                        key={data._id}
                        label={data.label}
                        value={data.value}
                    />
                ))}
            </div>

            <div className="dashboard-table-grid">
                <DashTable
                    title={"Available Jobs"}
                    data={jobData}
                    link={"/student/jobs"}
                />
            </div>
        </main>
    );
};

export default StudentDashboard;
