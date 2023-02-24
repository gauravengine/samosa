import React, {createContext, useContext, useEffect, useReducer} from 'react'
import produce from "immer";
import { useImmerReducer } from "use-immer";
const cartStateContext = createContext(null);
const cartDispatchContext = createContext(null);

// const reducer = (state, action) => {
// 	if (action.type === 'ADD') {
// 		/*
// 		selectedSize,foodItemObj in action
// 		 */
// 		console.log(action);
// 		console.log(action.foodItemObj.options[0]);
// 		const size=action.selectedSize
// 		console.log("size === ",size);
// 		console.log(action.foodItemObj.options[0][size]);
// 		console.log("---selected price ----",parseInt(action.foodItemObj.options[0][size]));
// 		return produce((state, draftState) => {
// 			let found = false;
//
// 			for (let i = 0; i < draftState.cartItems.length; i++) {
// 				if (draftState.cartItems[i]._id === action.foodItemObj._id && draftState.cartItems[i].selectedSize === action.foodItemObj.selectedSize) {
// 					found = true;
// 					draftState.cartItems[i].totalCartPrice+=parseInt(action.foodItemObj.options[0][size]);
//
// 					draftState.cartItems[i].quantity=(draftState.cartItems[i].quantity+1);
// 					draftState.cartItems[i].currItemPrice=draftState.cartItems[i].currItemPrice+parseInt(action.foodItemObj.options[0][size]) ;
// 				}
// 			}
// 			if(!found){
// 				let newObj=action.foodItemObj;
// 				newObj.currItemPrice=parseInt(action.foodItemObj.options[0][size]);
// 				newObj.quantity=1;
// 				newObj.selectedSize=action.selectedSize;
// 				draftState.cartItems.push(newObj);
// 				draftState.totalCartPrice+=newObj.currItemPrice;
// 			}
// 		})
// 	}
// 	if(action.type==='INCREASE'){
// 		return produce(state,draftState=>{
// 			for (let i = 0; i < draftState.cartItems.length; i++) {
// 				if (draftState.cartItems[i]._id === action.foodItemObj._id && draftState.cartItems[i].selectedSize === action.foodItemObj.selectedSize) {
//
// 					draftState.cartItems[i].totalCartPrice+=parseInt(action.foodItemObj.options[0][action.foodItemObj.selectedSize]);
// 					draftState.totalCartPrice+=parseInt(action.foodItemObj.options[0][action.foodItemObj.selectedSize]);
// 					draftState.cartItems[i].quantity=(draftState.cartItems[i].quantity+1);
// 					draftState.cartItems[i].currItemPrice=draftState.cartItems[i].currItemPrice+parseInt(action.foodItemObj.options[0][action.foodItemObj.selectedSize]) ;
// 				}
// 			}
// 		})
// 	}
// }

const reducer = (draftState, action) => {
	if (action.type === 'ADD') {
		/*
		selectedSize,foodItemObj in action
		 */
		console.log(action);
		console.log(action.foodItemObj.options[0]);
		const size=action.selectedSize
		console.log("size === ",size);
		// console.log(action.foodItemObj.options[0][size]);
		// console.log("---selected price ----",parseInt(action.foodItemObj.options[0][size]));
		let found = false;
		// console.log("here before loop","action.foodItemObj.selectedSize is ",action.foodItemObj.selectedSize)
		for (let i = 0; i < draftState.cartItems.length; i++) {
			// console.log("----- checking whether same id or not --------")
			// console.log("draftState.cartItems[i]._id is ",draftState.cartItems[i]._id)
			// console.log("action.foodItemObj._id is ",action.foodItemObj._id)
			// console.log("----- checking whether same size or not --------")
			// console.log("draftState.cartItems[i].selectedSize is ",draftState.cartItems[i].selectedSize)
			// console.log("action.foodItemObj.selectedSize is ",action.foodItemObj.selectedSize)
			if (draftState.cartItems[i]._id === action.foodItemObj._id && draftState.cartItems[i].selectedSize === action.selectedSize) {
				found = true;
				draftState.totalCartPrice+=parseInt(action.foodItemObj.options[0][size]);

				draftState.cartItems[i].quantity=(draftState.cartItems[i].quantity+1);
				draftState.cartItems[i].currItemPrice=draftState.cartItems[i].currItemPrice+parseInt(action.foodItemObj.options[0][size]) ;
			}
		}

		if(!found){
			let newObj={...action.foodItemObj};
			newObj.currItemPrice=parseInt(action.foodItemObj.options[0][size]);
			newObj.quantity=1;
			newObj.selectedSize=action.selectedSize;
			draftState.cartItems.push(newObj);
			draftState.totalCartPrice+=newObj.currItemPrice;
		}
	}
	if(action.type==='INCREASE'){
		for (let i = 0; i < draftState.cartItems.length; i++) {
			if (draftState.cartItems[i]._id === action.foodItemObj._id && draftState.cartItems[i].selectedSize === action.foodItemObj.selectedSize) {

				console.log("total cart price is ",draftState.totalCartPrice)
				draftState.totalCartPrice=draftState.totalCartPrice+parseInt(action.foodItemObj.options[0][action.foodItemObj.selectedSize]);
				draftState.cartItems[i].quantity=(draftState.cartItems[i].quantity+1);
				draftState.cartItems[i].currItemPrice=draftState.cartItems[i].currItemPrice+parseInt(action.foodItemObj.options[0][action.foodItemObj.selectedSize]) ;
			}
		}
	}
	if(action.type==='DECREASE'){
		for (let i = 0; i < draftState.cartItems.length; i++) {
			if (draftState.cartItems[i]._id === action.foodItemObj._id && draftState.cartItems[i].selectedSize === action.foodItemObj.selectedSize) {
				if(draftState.cartItems[i].quantity===1){
					draftState.totalCartPrice-=parseInt(action.foodItemObj.options[0][action.foodItemObj.selectedSize]);
					draftState.cartItems.splice(i,1);

					return;
				}

				draftState.totalCartPrice-=parseInt(action.foodItemObj.options[0][action.foodItemObj.selectedSize]);
				draftState.cartItems[i].quantity=(draftState.cartItems[i].quantity-1);
				draftState.cartItems[i].currItemPrice=draftState.cartItems[i].currItemPrice-parseInt(action.foodItemObj.options[0][action.foodItemObj.selectedSize]) ;
			}
		}
	}
}

const initialState = {
	'totalCartPrice': 0,
	'cartItems': []
}
export const CartProvider = ({children}) => {
	const [state, dispatch] = useImmerReducer(reducer, initialState);
	// useEffect(
	// 	()=>{
	// 		console.log(state);
	//
	// 	}	)
	return (
		<cartDispatchContext.Provider value={dispatch}>
			<cartStateContext.Provider value={state}>
				{children}
			</cartStateContext.Provider>
		</cartDispatchContext.Provider>

	)
}

export function useItemDispatch() {
	return useContext(cartDispatchContext);
}

export function useCartState() {
	return useContext(cartStateContext);
}