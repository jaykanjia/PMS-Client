import React from "react";

const DashboardCard = (props) => {
	return (
		<div className="dashboard-card">
			<div>
				<h1>{props.value}</h1>
				<span>{props.label}</span>
			</div>
			<div className="dash-card-img-container">
				<img
					src={`/img/icons/${props.label
						.replace(" ", "-")
						.toLowerCase()}.png`}
					alt=""
				/>
			</div>
		</div>
	);
};

export default DashboardCard;
