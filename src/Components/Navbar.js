import React, {useEffect, useState} from 'react';
import samosa from './samosa.png'
import {Outlet, useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";
import {useCartState, useItemDispatch} from './ContextReducer'
// function Navbar(props){
// 	return (
// 		<h1> Hello </h1>
// 	)

// }
const Navbar = (props) => {
	const [isLoggedIn, setisLoggedIn] = useState(false);
	let navigator = useNavigate()
	const dispatch = useItemDispatch()
	const cartState = useCartState();
	// console.log("hehehe just checking cartState",cartState);
	// console.log("heheheh just checking cartState.cartItems", cartState.cartItems)
	// console.log("heheheh just checking cartState.cartItems.length", cartState.cartItems.length)

	function handleAdd(itemObj) {
		dispatch({
			type: 'INCREASE',
			foodItemObj: itemObj,
		})
	}

	function handleLogout() {
		localStorage.removeItem('authToken');
		navigator(0);
	}

	useEffect(() => {
		console.log("running use Effect from Navbar")
		console.log(localStorage.getItem('authToken'))
		if (localStorage.getItem('authToken')) {
			setisLoggedIn(true);
		}
		console.log(isLoggedIn)
	}, [])

	function handleSub(itemObj) {
		dispatch({
			type: 'DECREASE',
			foodItemObj: itemObj,
		})
	}

	return (
		<>
			<header>
				<div className="px-3 py-2 text-bg-dark">
					<div className="container">
						<div
							className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
							<Link to={'/'}
							      className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">
								<img src={samosa} style={{'width': '50px'}} className="d-inline-block align-text-top"/>Samosa
							</Link>

							<ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
								<li>
									<Link to={'/'} className="nav-link text-danger ">
										<i className="bi bi-house-door-fill"> Home</i>
									</Link>
								</li>

								{isLoggedIn ? <>
									<li>
										<Link to={'/'} className="nav-link text-danger   ">

											<i className="bi bi-rocket-takeoff"  data-bs-toggle="modal"
											   data-bs-target="#staticBackdrop"> Cart</i>

										</Link>
									</li>
									<li>
										<Link onClick={handleLogout} to={'/'} className="nav-link text-danger">
											<i className="bi bi-airplane-fill"> Log Out</i>
										</Link>
									</li>
								</> : <>
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
								</>
								}
							</ul>
						</div>
					</div>
				</div>


			</header>

			<div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"
			     tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
				<div className="modal-dialog modal-lg">
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title fs-5" id="staticBackdropLabel">Your Cart's Total Value
								₹ {cartState.totalCartPrice}</h1>
							<button type="button" className="btn-close" data-bs-dismiss="modal"
							        aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<table className="table">
								<thead>
								<tr key={'1245'}>
									<th scope="col">Dish</th>
									<th scope="col">Size</th>
									<th scope="col">Quantity</th>
									<th scope="col">Price</th>
									<th scope="col">Change Quantity</th>
								</tr>
								</thead>
								{cartState.cartItems.length === 0 ? (<tbody></tbody>):
									<tbody>

									{
										cartState.cartItems.map((itemObj) => {
											return (
												<tr key={itemObj._id}>
													<td>{itemObj.name}</td>
													<td>{itemObj.selectedSize}</td>
													<td>{itemObj.quantity}</td>
													<td>{itemObj.currItemPrice}</td>
													<td>
														<div
															className="btn-group btn-group-sm border border-dark-subtle "
															role="group"
															aria-label="Basic example">
															<button onClick={()=>handleSub(itemObj)} type="button" className="btn btn-danger"><i
																className="bi bi-dash-circle"></i></button>
															<h4 className="ms-2 me-2 pt-1">{itemObj.quantity}</h4>
															<button onClick={() => handleAdd(itemObj)} type="button"
															        className="btn btn-danger"><i
																className="bi bi-plus-circle"></i></button>
														</div>
													</td>

												</tr>
											)
										})
									}
									</tbody>
								}
							</table>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
							<button type="button" className="btn btn-primary">Checkout</button>
						</div>
					</div>
				</div>
			</div>
			<Outlet/>
		</>
	)
}

export default Navbar;