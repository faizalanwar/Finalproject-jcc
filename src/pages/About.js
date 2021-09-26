import React from "react";

const About = () => {
	let myData = {
		nama: "Faizalanwar",
		email: "fzlanwr@gmail.com",
		os: "Manjaro",
		github: "@faizalanwar",
		telegram: "08132091820",
	};

	return (
		<div>
			<Render props={myData} />
		</div>
	);
};

function Render({ props }) {
	return (

		<div style={{}}  className="home-container">
			<section>
				
				<h1 style={{ textAlign: "center" , fontSize:'50px', fontWeight:'bolder'}}>
					About Me
				</h1>
				<table>
					<ol>
						<li>
							<tr>
								<td>
									<strong>Nama:</strong>
								</td>
								<td>{props.nama}</td>
							</tr>
						</li>
						<li>
							<tr>
								<td>
									<strong>Email:</strong>
								</td>
								<td>{props.email}</td>
							</tr>
						</li>
						<li>
							<tr>
								<td>
									<strong>Sistem Operasi :</strong>
								</td>
								<td>{props.os}</td>
							</tr>
						</li>
						<li>
							<tr>
								<td>
									<strong>Akun Github:</strong>
								</td>
								<td>{props.github}</td>
							</tr>
						</li>
						<li>
							<tr>
								<td>
									<strong>Akun Telegram:</strong>
								</td>
								<td>{props.telegram}</td>
							</tr>
						</li>
					</ol>
				</table>
			</section>
		</div>
	);
}

export default About;
