import {
    REGISTER_SUCCESS,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    BECOME_AN_INSTRUCTOR_SUCCESS,
    LOGOUT_SUCCESS,
    LOAD_USERS_SUCCESS,
    LOAD_AUTHENTICATED_USER_FAILURE,
    LOAD_AUTHENTICATED_USER_SUCCESS,
    LOAD_SINGLE_USER_SUCCESS,
    DELETE_USER_SUCCESS,
    UPDATE_USER_PROFILE_SUCCESS,
    UPDATE_ADMIN_PROFILE_SUCCESS
} from '../actions/actionTypes';

const initialState = {
    users: [],
    user: {},
    message:'',
    loginSuccess:false,
    registerSuccess: false,
    becomeAnInstructorSuccess:false
};

export const UserReducer = (state = initialState,action) => {
    switch(action.type) {
        case LOGIN_SUCCESS:
            console.log('reducer login success...');
            console.log(action.payload);
            return {
                ...state,
                loginSuccess:true,
                message:'',
                user:action.payload.user
            }
        case LOGIN_FAILURE:
            console.log('reducer login failure...');
            console.log(action.payload);
            return {
                ...state,
                loginSuccess:false,
                message: action.payload,
                user:null
            }
        case BECOME_AN_INSTRUCTOR_SUCCESS:
                console.log('reducer become an instructor success...');
                console.log(action.payload);
                return {
                    ...state,
                    becomeAnInstructorSuccess:true,
                    user: {
                        ...state.user,
                        isAmdin: false,
                        role:1
                    }
                }
        case REGISTER_SUCCESS:
            console.log('reducer register success...');
            return {
                ...state,
                registerSuccess:true
            }
        case LOGOUT_SUCCESS:
            console.log('reducer logout success...');
            return {
                ...state,
                loginSuccess:false,
                user: {}
            }
        case LOAD_AUTHENTICATED_USER_FAILURE:
                console.log('payload');
                console.log(action.payload);
                return {
                    ...state,
                    user: null,
                    loginSuccess:false,
                    message: action.payload
                }    
        case LOAD_AUTHENTICATED_USER_SUCCESS:
            console.log('payload LOAD_AUTHENTICATED_USER_SUCCESS');
            console.log(action.payload);
            let newState2 = {
                ...state,
                user: action.payload,
                loginSuccess: true,
                message: 'Load user infor succesfully!'
            }
            console.log('new state');
            console.log(newState2);
            return newState2;
        case LOAD_USERS_SUCCESS :
            console.log('payload'+ action.payload.data);
            const newState1 = [
                ...state,
                ...action.payload.data
                ];
            console.log('after state'+ newState1);
            //return newState1;
            return action.payload.data;
        case LOAD_SINGLE_USER_SUCCESS :
            console.log('LOAD_SINGLE_USER_SUCCESS ');
            console.log(action.payload);
            const newStateSingleUser = {
                ...state,
                user: action.payload.user
            };
            console.log('after LOAD_SINGLE_USER_SUCCESS'+ newStateSingleUser);
            //return newState1;
            return newStateSingleUser;
        case DELETE_USER_SUCCESS :
            const userID = parseInt(action.payload);
            console.log('userID'+ userID);
            return state.filter(item => item.id !== userID);
        case UPDATE_ADMIN_PROFILE_SUCCESS :
            console.log(action.payload);
            console.log(state);
            return {
                ...state,
                users: action.payload
            }
        case UPDATE_USER_PROFILE_SUCCESS :
            console.log('payload LOAD_AUTHENTICATED_USER_SUCCESS');
            console.log(action.payload);
            let newStateUpdateUserInfo = {
                ...state,
                user: action.payload.user
            }
            console.log('new state');
            console.log(newStateUpdateUserInfo);
            return newStateUpdateUserInfo;
        default : 
            return state;
    }
}