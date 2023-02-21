import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
export default function SignUp(props){
	const [formData,setFormData]=useState({
		'firstName':'',
		'lastName':'',
		'address':'',
		'email':'',
		'password':''
	})
	const navigate=useNavigate();
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
			"firstName": formData.firstName,
			"lastName": formData.lastName,
			"email": formData.email,
			"password": formData.password,
			"address": formData.address
		});

		const requestOptions = {
			method: 'POST',
			headers: {"Content-Type":"application/json"},
			body: raw,
		};

		const respone = await fetch("http://localhost:7000/api/signup/", {
			method: "POST",
			headers: {"Content-Type":"application/json"},
			body: raw,
		})
		const jsonData=await respone.json();
		console.log("=====printing jsonData =====");
		console.log(jsonData);
		if(!jsonData.errors){
			navigate('/');
		}
		else{
			alert("Please Enter data correctly and Try again ");
		}


	}
	return (
		<>
			<div className={''}>
				<div className={'row'}>
					<div className={'col-sm-0 col-md-4 rounded-0'}>
						<div className="card" >
							<img style={{'height':'100vh','objectFit':'cover','margin':'0'}} className="card-img-top rounded-0"  src="https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="Card image cap" />

						</div>

					</div>
					<div className={'col-8 container mt-4 w-50'}>
						<form onSubmit={handleSubmit}>
							<label htmlFor="name" className="form-label">Name</label>
							<div className="input-group mb-3" id={'name'}>
								<span className="input-group-text">First and last name</span>
								<input name={'firstName'} onChange={(e)=>handleChange(e)} type="text" aria-label="First name" className="form-control"/>
								<input name={'lastName'} onChange={(e)=>handleChange(e)} type="text" aria-label="Last name" className="form-control" />
							</div>
							<label htmlFor="username" className="form-label">Your Address</label>

							<div className="input-group mb-3 ">
								<span className="input-group-text" id="basic-addon1">✈️</span>
								<input name={'address'} onChange={(e)=>handleChange(e)}  type="text" className="form-control" placeholder="Address" aria-label="Username"
								       aria-describedby="basic-addon1" id={'username'}/>
							</div>
							<div className="mb-3">
								<label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
								<input name={'email'} onChange={(e)=>handleChange(e)} type="email" className="form-control" id="exampleInputEmail1"
								       aria-describedby="emailHelp"/>
								<div id="emailHelp" className="form-text">We'll never share your email with anyone
									else.
								</div>
							</div>
							<div className="mb-3">
								<label htmlFor="exampleInputPassword1" className="form-label">Password</label>
								<input name={'password'} onChange={(e)=>handleChange(e)} type="password" className="form-control" id="exampleInputPassword1"/>
							</div>

							<button onClick={(e)=>handleSubmit(e)} type="submit" className="btn btn-primary">Submit</button>
						</form>
					</div>
				</div>
			</div>
		</>
	)
}