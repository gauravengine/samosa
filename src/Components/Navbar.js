import React from 'react';
import samosa from './samosa.png'
import {Outlet} from "react-router-dom";
import {Link} from "react-router-dom";
// function Navbar(props){
// 	return (
// 		<h1> Hello </h1>
// 	)
// }
const Navbar=(props)=>{
	return (
		<>
		<header>
			<div className="px-3 py-2 text-bg-dark" >
				<div className="container">
					<div
						className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
						<Link to={'/'}
						   className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">
							<img src={samosa} style={{'width':'50px'}} className="d-inline-block align-text-top"/>Samosa
						</Link>

						<ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
							<li>
								<Link to={'/'} className="nav-link text-danger">
									<i className="bi bi-house-door-fill"> Home</i>

								</Link>
							</li>

							<li>
								<Link to={'/'} className="nav-link text-danger btn " data-bs-toggle="modal" data-bs-target="#exampleModal">
									<i className="bi bi-rocket-takeoff"> Orders</i>

								</Link>
							</li>
							<li>
								<Link to={'/login'} className="nav-link text-danger">
									<i className="bi bi-door-open"> Login</i>
								</Link>
							</li>
							<li>
								<Link to={'signup'} className="nav-link text-danger">
									<i className="bi bi-door-open-fill"> Sign Up</i>
								</Link>
							</li>
							<li>
								<a href="#" className="nav-link text-danger">
									<i className="bi bi-airplane-fill"> Log Out</i>
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
			     aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
							<button type="button" className="btn-close" data-bs-dismiss="modal"
							        aria-label="Close"></button>
						</div>
						<div className="modal-body">
							Dy harsh
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
							<button type="button" className="btn btn-primary">Save changes</button>
						</div>
					</div>
				</div>
			</div>
		</header>
			<Outlet/>
		</>
	)
}

export default Navbar;