import axios from 'axios';
import {LOAD_COURSE_CURRICULUM_FAILURE,LOAD_SINGLE_COURSE_SUCCESS,LOAD_COURSES_SUCCESS,DELETE_COURSE_SUCCESS,LOAD_INSTRUCTOR_COURSES_SUCCESS,CREATE_COURSE_SUCCESS, GET_COURSE_BY_ID_SUCCESS,UPDATE_COURSE_SUCCESS,LOAD_COURSE_CURRICULUM_SUCCESS,UPDATE_COURSE_CURRICULUM_SUCCESS} from './actionTypes';


export const loadSingleCourseSuccess = (data) => {
    return {
        type: LOAD_SINGLE_COURSE_SUCCESS,
        payload: data
    }
}

export const loadSingleCourse = (courseID) => {
    return (dispatch) => {
        axios.get('http://localhost:3004/api/courses/'+courseID,{withCredentials: true})
            .then(res => {
                console.log('after call get single course API....');
                console.log(res.data);
                dispatch(loadSingleCourseSuccess(res.data[0]));
            }).catch(error => {

            });
    }
}

export const loadCourses = () => {
    return (dispatch) => {
        axios.get('http://localhost:3004/api/courses/all_courses',{withCredentials: true})
            .then(res => {
                //console.log('after call API....');
                //console.log(res.data);
                dispatch(loadCourseSuccess(res.data));
            }).catch(error => {

            });
    }
}

export const loadCourseSuccess = (data) => {
    return {
        type: LOAD_COURSES_SUCCESS,
        payload: data
    }
}

export const approveRejectCourse = (id,courseStatus) => {
    return (dispatch) => {
        axios.put('http://localhost:3004/api/courses/approve_reject_course/'+id,courseStatus,{withCredentials: true})
            .then(res => {
                //console.log('after call api updsate course category');
                //console.log(res.data);
                //console.log(id);
                dispatch(loadCourseSuccess(res.data));
            }).catch(error => {

        });
    }
}


export const submitCourseForApproval = (id,courseStatus) => {
    return (dispatch) => {
        
        axios.put('http://localhost:3004/api/courses/submit_course_for_approval/'+id,courseStatus,{withCredentials: true})
            .then(res => {
                //console.log('after call api updsate course category');
                //console.log(res.data);
                //console.log(id);
                dispatch(loadInstructorCourseSuccess(res.data));
            }).catch(error => {

        });
    }
}

export const loadInstructorCourseSuccess = (data) => {
    return {
        type: LOAD_INSTRUCTOR_COURSES_SUCCESS,
        payload: data
    }
}

export const loadInstructorCourses = () => {
    return (dispatch) => {
        axios.get('http://localhost:3004/api/courses/instructor_courses',{withCredentials: true})
            .then(res => {
                //console.log(res.data);
                dispatch(loadInstructorCourseSuccess(res.data));
            }).catch(error => {

            });
    }
}

export const createCourseSuccess = (data) => {
    return {
        type: CREATE_COURSE_SUCCESS, 
        payload: data
    }
}

export const createCourse = (course) => {
    return (dispatch) => {
        axios.post('http://localhost:3004/api/courses',course,{withCredentials: true})
        .then(results =>
        {
            console.log('data return from create course  api');
            console.log(results);
            dispatch(createCourseSuccess(results.data.course));
        }
        )
    }
}

export const deleteCourseSuccess = (courseID) => {
    return {
        type:DELETE_COURSE_SUCCESS,
        payload: courseID
    }
}

export const deleteCourse = (courseID) => {
    return (dispatch) => {
        axios.delete('http://localhost:3004/api/courses/'+courseID,{withCredentials: true})
            .then(res => {
                dispatch(deleteCourseSuccess(courseID));
            }).catch(error => {

            });
    }
}

export const updateCourseSuccess = (courseId,course) => {
    return {
        type: UPDATE_COURSE_SUCCESS, 
        id: courseId,
        payload: course
    }
}

export const updateCourseInfo = (courseId,course) => {
    return (dispatch) => {
        axios.put('http://localhost:3004/api/courses/'+courseId,course)
        .then(results =>
        {
            console.log('data return from update course  api');
            console.log(results);
            dispatch(updateCourseSuccess(courseId,results.data.course));
        }
        )
    }
}

export const getCourseByIdSuccess = (course) => {
    return {
        type: GET_COURSE_BY_ID_SUCCESS, 
        payload: course
    }
}

export const getCourseById = (id) => {
    return (dispatch) => {
        axios.get('http://localhost:3004/api/courses/'+id)
        .then(results =>
        {
            console.log('data return from get single course  api');
            console.log(results);
            //if(results.data.length)
            dispatch(getCourseByIdSuccess(results.data[0]));
        }
        )
    }
}

export const loadCourseCurriculumSuccess = (data) => {
    return {
        type: LOAD_COURSE_CURRICULUM_SUCCESS,
        payload: data
    }
}

export const loadCourseCurriculumFailure = (data) => {
    return {
        type: LOAD_COURSE_CURRICULUM_FAILURE,
        error:true,
        payload: []
    }
}

export const updateCourseCurriculumSuccess = (data) => {
    return {
        type: UPDATE_COURSE_CURRICULUM_SUCCESS,
        payload : data
    }
}

export const updateCourseCurriculum = (id,course) => {
    return (dispatch) => {
        axios.put('http://localhost:3004/api/courses/update_curriculum/'+id,course,{withCredentials: true})
            .then(res => {
                console.log('updateCourseCurriculum actions');
                console.log(res.data);
                dispatch(updateCourseCurriculumSuccess(res.data.curriculum));
            }).catch(error => {

            });
    }
}

export const loadCourseCurriculum = (id) => {
    return (dispatch) => {
        axios.get('http://localhost:3004/api/courses/curriculum/'+id,{withCredentials: true})
            .then(res => {
                console.log('loadCourseCurriculum action...');
                console.log(res.data);
                dispatch(loadCourseCurriculumSuccess(res.data.curriculum));
            }).catch(error => {
                const emptyArray = [];
                dispatch(loadCourseCurriculumFailure(emptyArray));
            });
    }
}