import {LOAD_COURSE_CURRICULUM_FAILURE,LOAD_SINGLE_COURSE_SUCCESS,LOAD_COURSES_SUCCESS,DELETE_COURSE_SUCCESS,LOAD_INSTRUCTOR_COURSES_SUCCESS,CREATE_COURSE_SUCCESS, GET_COURSE_BY_ID_SUCCESS,UPDATE_COURSE_SUCCESS,LOAD_COURSE_CURRICULUM_SUCCESS,UPDATE_COURSE_CURRICULUM_SUCCESS } from '../actions/actionTypes';
const initialState = {
    all_courses: [],
    home_courses:[],
    single_course: {},
    instructor_courses: [],
    selected_instructor_course:{},
    curriculum: [],
    success: false,
    error: '',
    errorLoadCurriculum:''
}
export const CourseReducer = (state=initialState ,action) =>
{
    switch(action.type) {
        case LOAD_SINGLE_COURSE_SUCCESS :
            //console.log('payload single course:'+ action.payload);
            return {
                ...state,
                single_course: action.payload
            }
        case LOAD_COURSES_SUCCESS :
            //console.log('payload COURSES:');
            //console.log(action.payload);
            return {
                ...state,
                all_courses: action.payload,
                home_courses:action.payload.filter(item=>parseInt(item.status) >= 2)
            }

        case DELETE_COURSE_SUCCESS :
            const courseID = action.payload;
            const newAdminCourses = state.all_courses.filter(item => item.id !== courseID);
            const newInstructorCourses = state.instructor_courses.filter(item => item.id !== courseID);
            return {
                ...state,
                all_courses: newAdminCourses,
                instructor_courses: newInstructorCourses
            }
        case LOAD_COURSE_CURRICULUM_FAILURE: 
            return {
                ...state,
                curriculum:[],
                errorLoadCurriculum:'You do not have permission to access this route'
            }
        case UPDATE_COURSE_CURRICULUM_SUCCESS :
            //console.log('payload course curriculum:'+ action.payload);
            return {
                ...state,
                curriculum: action.payload
            }
        case LOAD_INSTRUCTOR_COURSES_SUCCESS :
            //console.log('payload COURSES:'+ action.payload);
            return {
                ...state,
                instructor_courses: action.payload
            }
        case UPDATE_COURSE_SUCCESS: 
        let newState = state.instructor_courses.filter(item=>item._id != action.id);
            return {
                ...state,
                instructor_courses: [
                    ...newState,
                    action.payload
                ]
            }
        case LOAD_COURSE_CURRICULUM_SUCCESS :
            console.log('payload COURSES CURRICULUM:');
            console.log(action.payload);
            return {
                ...state,
                curriculum: action.payload
            }
        case GET_COURSE_BY_ID_SUCCESS:
            return {
                ...state,
                selected_instructor_course: action.payload
            }
        case CREATE_COURSE_SUCCESS: 
        console.log('CourseReducer');
        console.log(action.payload);
            return {
                ...state,
                instructor_courses: [
                    ...state.instructor_courses,
                    action.payload
                ]
            }
       
        default:
            return state;
    }
}