import axios from 'axios';
import {LOAD_COURSE_CATEGORIES, CREATE_COURSE_CATEGORY_SUCCESS ,DELETE_COURSE_CATEGORY_SUCCESS, UPDATE_COURSE_CATEGORY_SUCCESS} from '../actions/actionTypes';

export const createCourseCategorySuccess = (data) => {
    return {
        type: CREATE_COURSE_CATEGORY_SUCCESS, payload: data
    }
}

export const createCourseCategory = (courseCategory) => {
    return (dispatch) => {
        axios.post('http://localhost:3004/api/course_categories',courseCategory)
        .then(results =>
        {
            console.log('data return from create course category api');
            console.log(results.data);
            dispatch(createCourseCategorySuccess(results.data));
        }
        )
    }
}

export const updateCourseCategorySuccess = (selectedCourseCategoryId,data) => {
    return {
        type: UPDATE_COURSE_CATEGORY_SUCCESS, 
        id: selectedCourseCategoryId,
        payload: data
    }
}

export const updateCourseCategory = (selectedCourseCategoryId,courseCategory) => {
    return (dispatch) => {
        axios.put('http://localhost:3004/api/course_categories/'+selectedCourseCategoryId,courseCategory)
        .then(results =>
        {
            console.log('data return from update course category api');
            console.log(results);
            dispatch(updateCourseCategorySuccess(selectedCourseCategoryId,results.data));
        }
        )
    }
}

export const loadCourseCategories = () => {
    return (dispatch) => {
        axios.get('http://localhost:3004/api/course_categories')
        .then(results =>
        {
            console.log('the course categories returned from api server');
            console.log(results.data);
            dispatch({type: LOAD_COURSE_CATEGORIES, payload: results.data});
        }
        )
    }
}

export const deleteCourseCategorySuccess = (courseCategoryID) => {
    return {
        type: DELETE_COURSE_CATEGORY_SUCCESS,
        payload: courseCategoryID
    }
}

export const deleteCourseCategory = (courseCategoryID) => {
    return (dispatch) => {
        axios.delete('http://localhost:3004/api/course_categories/'+courseCategoryID,{withCredentials: true})
            .then(res => {
                dispatch(deleteCourseCategorySuccess(courseCategoryID));
            }).catch(error => {

            });
    }
}