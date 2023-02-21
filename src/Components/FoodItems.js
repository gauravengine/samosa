import React, {useEffect, useState} from "react";
import axios from "axios";
export default function FoodItems(props){
	const [foodData,setfoodData]=useState({
		"foods":[],
	});
	console.log("rendering FOOditenms");
	useEffect(()=>{
		console.log("running useEffect");
		let result;
		async function fetchData(){
			result=await axios('http://localhost:7000/api/foodItems')
			// console.log(result.data.foods);
			setfoodData({
				foods:result.data.foods
			})
		}

		fetchData()

	},[]);
	return (
		<>
			<div className="row row-cols-2 row-cols-md-2 row-cols-lg-4 row-cols-sm-1 g-4  container-fluid align-items-center">
				{
					foodData.foods.map((foodItem)=>{
						return (
							<div className="col ">
								<div className="card mycards">
									<img src={foodItem.img} className="card-img-top" alt={foodItem.name}  />
									<div className="card-body">
										<h5 className="card-title">{foodItem.name}</h5>
										<p className="card-text">{foodItem.description}</p>
										<div className={'container-fluid '}>
											<div className={'row justify-content-center align-items-center'}>
												<div className={'col-md-9 align-self-baseline  '}>
													<select className="form-select form-select-sm mt-3 mb-3 "
													        aria-label=".form-select-sm example">
														<option selected value="1">One</option>
														<option value="2">Two</option>
														<option value="3">Three</option>
													</select>
												</div>
												<div className={'col-md-3 '}>
													<button className={'btn btn-danger btn'}>Buy</button>
												</div>

											</div>
										</div>
									</div>
								</div>
							</div>
						)
					})
				}
			</div>
			Hello World
		</>
	)
}