import React from 'react';
import FoodItems from "./FoodItems";
function Carousel(props){
	console.log("Rendering Carousel");
	return (
		<>
			<div id="mycarousel" className="carousel slide carousel-fade position-relative"  data-bs-ride="carousel">
				<div className="carousel-inner" id={'mycarousel-inner'} >
					<div className="carousel-item active"  id={'imageContainer'} data-bs-interval="10000">
						<img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" className="d-block w-100 " id={'img1'} style={{'filter':'brightness(40%)','objectFit':'contain'}}alt="pizza"/>
					</div>
					<div className="carousel-item" id={'imageContainer1'} data-bs-interval="10000">
						<img src="https://images.unsplash.com/photo-1665066618253-7b58e7c97cda?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80" className="d-block w-100 " id={'img2'} style={{'filter':'brightness(40%)'}} alt="pasta"/>
					</div>
					<div className="carousel-item"  id={'imageContainer2'} data-bs-interval="10000">
						<img src="https://source.unsplash.com/random/900*700/?rice dish" className="d-block w-100 " id={'img3'} style={{'filter':'brightness(40%)'}} alt="rice"/>
					</div>

				</div>

				<input className={' z-3 w-25 form-control position-absolute top-50 start-50 translate-middle' } id={'searchArea'} placeholder={'Search Your Favorite Food'}/>
			</div>
			<p className="text-center fs-1 text-bg-dark text-warning">Best Food Near You</p>

		</>
	)
}
export default Carousel;