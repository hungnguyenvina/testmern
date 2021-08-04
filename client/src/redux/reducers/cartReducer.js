import {ADD_COURSE_TO_CART_SUCCESS,REMOVE_COURSE_FROM_CART_SUCCESS,LOAD_MULTIPLE_COURSES_SUCCESS } from '../actions/actionTypes';

const initialState = {
    cart:[],
    cartDetail:[]
};

export const CartReducer = (state = initialState,action) => {
    switch(action.type) {
        case ADD_COURSE_TO_CART_SUCCESS :
            //console.log('add course to cart');
            //console.log(action.payload);
            return {
                ...state,
                cart: action.payload
            }
        case REMOVE_COURSE_FROM_CART_SUCCESS:
            //console.log('reducer remove course from cart');
            //console.log(action.payload);
            return {
                ...state,
                cartDetail: action.payload.cartDetail
            }
        case LOAD_MULTIPLE_COURSES_SUCCESS :
            //console.log('load multiple course from cart');
            //console.log(action.payload);
            return {
                ...state,
                cartDetail: action.payload
            }    
        default : 
            return state;
    }
    
}