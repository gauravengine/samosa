import React, {useState} from "react";
import {json} from "react-router-dom";

const imgLink='https://images.unsplash.com/photo-1609951651556-5334e2706168?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzh8fGZvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
export default function Login(props){
	const [formData,setFormData]=useState({
		'email':'',
		'password':''
	})
	function handleChange(e){
		setFormData({
			...formData,
			[e.target.name]:e.target.value
		})
		console.log(formData)
	}
	async function handleSubmit(e){
		e.preventDefault();

		// const myHeaders = new Headers();
		// myHeaders.append("Content-Type", "application/json");

		const raw = JSON.stringify({
			"email": formData.email,
			"password": formData.password,
		});

		const requestOptions = {
			method: 'POST',
			headers: {"Content-Type":"application/json"},
			body: raw,
		};

		const response = await fetch("http://localhost:7000/api/login/", requestOptions)
		const jsonData=await response.json();
		console.log("=====printing jsonData =====");
		console.log(jsonData);
		if(!jsonData.message){
			//login success done
			const authToken=jsonData.authToken
			localStorage.setItem("authToken",authToken);
		}
		else{
			const message=jsonData.message
			alert(message);
		}
	}
	return (
		<>
			<div className={''}>
				<div className={'row'}>
					<div className={'col-sm-0 col-md-4 rounded-0'}>
						<div className="card" >
							<img style={{'height':'100vh','objectFit':'cover','margin':'0'}} className="card-img-top rounded-0"  src={imgLink} alt="Card image cap" />

						</div>

					</div>
					<div className={'col-8 container mt-4 w-50'}>
						<form onSubmit={handleSubmit}>
							<div className="mb-3">
								<label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
								<input onChange={handleChange} name={'email'}  type="email" className="form-control" id="exampleInputEmail1"
								       aria-describedby="emailHelp"/>
									<div id="emailHelp" className="form-text">We'll never share your email with anyone
										else.
									</div>
							</div>
							<div className="mb-3">
								<label htmlFor="exampleInputPassword1" className="form-label">Password</label>
								<input onChange={handleChange} name={'password'} type="password" className="form-control" id="exampleInputPassword1"/>
							</div>

							<button type="submit" className="btn btn-primary">Submit</button>
						</form>
					</div>
				</div>
			</div>
		</>
	)
}