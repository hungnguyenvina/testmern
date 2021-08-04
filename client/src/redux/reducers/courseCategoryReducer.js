import {CREATE_COURSE_CATEGORY_SUCCESS, LOAD_COURSE_CATEGORIES,UPDATE_COURSE_CATEGORY_SUCCESS,DELETE_COURSE_CATEGORY_SUCCESS } from '../actions/actionTypes';
const initialState = {
    course_categories: [],
    selected_course_category: {},
    success: false,
    error: ''
}
export const CourseCategoryReducer = (state=initialState ,action) =>
{
    switch(action.type) {
        case CREATE_COURSE_CATEGORY_SUCCESS: 
            return {
                ...state,
                course_categories: [
                    ...state.course_categories,
                    action.payload
                ]
            }
        case UPDATE_COURSE_CATEGORY_SUCCESS: 
        console.log('UPDATE_COURSE_CATEGORY_SUCCESS.................');
        console.log(action.payload);
        let newState = state.course_categories.filter(item=>item._id != action.payload._id);
            return {
                ...state,
                course_categories: [
                    ...newState,
                    action.payload
                ]
            }
        case LOAD_COURSE_CATEGORIES :
            console.log('LOAD_COURSE_CATEGORIES reducer');
            console.log(action.payload);
            return {
                ...state,
                course_categories: action.payload
            }
        case DELETE_COURSE_CATEGORY_SUCCESS :
            const courseCategoryID = action.payload;
            console.log('DELETE_COURSE_CATEGORY_SUCCESS reducer '+ courseCategoryID);
            let y = state.course_categories.filter(item => item._id !== courseCategoryID);
            console.log(y);
            return {
                ...state,
                course_categories: state.course_categories.filter(item => item._id !== courseCategoryID)
                
            }
        default:
            return state;
    }
}