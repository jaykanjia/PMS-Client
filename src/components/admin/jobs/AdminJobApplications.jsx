import axios from "axios";
import React, { useState, useEffect } from "react";
import AdminShowJobsStudent from "./AdminShowJobsStudent";
import Loading from "../../Loading";

const AdminJobApplications = () => {
	const [jobApplications, setJobApplications] = useState([]);
	const [searchBoxData, setSearchBoxData] = useState("");
	const [search, setSearch] = useState("");
	const [approvedJob, setApprovedJob] = useState("");
	const [loading, setLoading] = useState(false);

	function handleSearch() {
		if (searchBoxData !== "") {
			setSearch(searchBoxData);
			console.log(searchBoxData);
		}
	}

	const fetchData = () => {
		setLoading(true);
		axios
			.get("http://localhost:5001/api/admin/fetch/jobapplications", {
				headers: {
					"auth-token": sessionStorage.getItem("auth-token"),
				},
			})
			.then((res) => {
				// console.log(res.data);
				setJobApplications((prev) => res.data);
			})
			.catch((err) => console.log(err));
		setLoading(false);
	};
	const searchData = () => {
		setLoading(true);
		axios
			.post(
				`http://localhost:5001/api/admin/fetch/jobapplications`,
				{
					query: searchBoxData,
				},
				{
					headers: {
						"auth-token": sessionStorage.getItem("auth-token"),
					},
				}
			)
			.then((res) => {
				setJobApplications(() => {
					return res.data;
				});
			})
			.catch((err) => console.log(err));
		setLoading(false);
	};
	const approveJobApplication = (id) => {
		axios
			.post(
				"http://localhost:5001/api/admin/add/approvejob",
				{
					applicationid: id,
				},
				{
					headers: {
						"auth-token": sessionStorage.getItem("auth-token"),
					},
				}
			)
			.then((res) => {
				// console.log(res.data);
				window.alert(res.data.msg);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		searchData();
	}, [search]);

	useEffect(() => {
		if (approvedJob === null || approvedJob === "") return;
		approveJobApplication(approvedJob);
		fetchData();
	}, [approvedJob]);

	useEffect(() => {
		fetchData();
	}, [jobApplications]);

	return (
		<main>
			{loading ? (
				<Loading />
			) : (
				<>
					<div className="search-area flex justify-between items-center">
						<h1>Job Applications</h1>
						<div className="search-wrapper flex gap-0">
							<input
								className="search-box"
								type="text"
								placeholder="Search"
								onChange={(e) =>
									setSearchBoxData(e.target.value)
								}
							/>
							<button
								className="search-button flex items-center justify-center svg-wrapper"
								onClick={handleSearch}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
									/>
								</svg>
							</button>
						</div>
					</div>
					<AdminShowJobsStudent
						data={jobApplications}
						approveBtn={true}
						setApprovedJob={setApprovedJob}
					/>
				</>
			)}
		</main>
	);
};

export default AdminJobApplications;
