import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {useItemDispatch} from './ContextReducer'
export default function FoodItems(props) {
	const dispatch=useItemDispatch()
	const [foodData, setfoodData] = useState({
		"foods": [],
	});
	console.log("rendering FOOditenms");

	useEffect(() => {
		console.log("running useEffect");
		let result;
		let tempResult

		async function fetchData() {
			result = await axios('http://localhost:7000/api/foodItems')
			// console.log(result.data.foods);
			// setfoodData({
			// 	foods:result.data.foods
			// })
			tempResult = result.data.foods
		}

		fetchData().then(() => {

				const tempFoodData = tempResult.map((foodItem) => {
					const tempSelectOptions = []
					for (const [key, value] of Object.entries(foodItem.options[0])) {
						if (key === '_id') continue;
						tempSelectOptions.push({sizeName: key, price: value});
					}
					foodItem.selectOptions = tempSelectOptions;
					return foodItem;
				});
				setfoodData({
					foods: tempFoodData
				})

			}
		)


	}, []);

	function submitHandler(e,foodItem) {
		e.preventDefault();
		const form = e.target;
		const formData = new FormData(form);
		// console.log([...formData.entries()]);
		const temp=[...formData.entries()];
		console.log("********** going to print size ********")
		console.log(temp[0][1]);
		console.log(foodItem);
		dispatch({
			type:'ADD',
			selectedSize:temp[0][1],
			foodItemObj:foodItem,
		})
	}

	return (
		<>
			<div
				className="row row-cols-2 row-cols-md-2 row-cols-lg-4 row-cols-sm-1 g-4  container-fluid align-items-center">
				{
					foodData.foods.map((foodItem) => {
						return (
							<div key={foodItem._id} className="col ">
								<div className="card mycards">
									<img src={foodItem.img} className="card-img-top" alt={foodItem.name}/>
									<div className="card-body">
										<h5 className="card-title">{foodItem.name}</h5>
										<p className="card-text">{foodItem.description}</p>
										<hr/>
										<div className={'container-fluid '}>

											<div className={'row justify-content-center align-items-center'}>
												<form onSubmit={(e)=>submitHandler(e,foodItem)}>
													<span className={'col-md-6 align-self-baseline  '}>
														<select className="form-select form-select-md mt-3 mb-3 "
														        aria-label=".form-select-sm example"
														        name={'sizeSelected'} >
															{
																foodItem.selectOptions.map((item) => {
																	return (<option key={item.sizeName}
																	                value={item.sizeName}>{`${item.sizeName} for ₹ ${item.price}`}</option>)
																})
															}

														</select>
													</span>
													<span className={'col-md-4'}>
														<button type={'submit'} className={'btn btn-danger btn'}>Add to Cart
														</button>

														{/*<div className="btn-group btn-group-sm border border-dark-subtle "  role="group"*/}
														{/*     aria-label="Basic example">*/}
														{/*	<button type="button" className="btn btn-danger"><i*/}
														{/*		className="bi bi-dash-circle"></i></button>*/}
														{/*	<h4 className="ms-2 me-2 pt-1">1</h4>*/}
														{/*	<button type="button" className="btn btn-danger"><i*/}
														{/*		className="bi bi-plus-circle"></i></button>*/}
														{/*</div>*/}
													</span>
												</form>
											</div>

										</div>
									</div>
								</div>
							</div>
						)
					})
				}
			</div>
		</>
	)
}