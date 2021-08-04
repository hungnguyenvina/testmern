import {SAVE_USER_TRANSACTION_SUCCESS,LOAD_USER_TRANSACTIONS_SUCCESS,LOAD_USER_DETAIL_TRANSACTIONS_SUCCESS} from './actionTypes';
import axios from 'axios';

export const saveUserTransactionSuccess = (data) => {
    return {
        type: SAVE_USER_TRANSACTION_SUCCESS,
        payload : data
    }
}

export const saveUserTransaction = (transaction) => {
    return (dispatch) => {
        axios.post('http://localhost:3004/api/transactions/save_user_transaction/',transaction,{withCredentials: true})
            .then(res => {
                console.log('result from api saveUserTransaction');
                console.log(res.data);
                dispatch(saveUserTransactionSuccess(res.data.transaction));
            }).catch(error => {

            });
    }
}

export const loadUserTransactionSuccess = (data) => {
    return {
        type: LOAD_USER_TRANSACTIONS_SUCCESS,
        payload: data
    }
}

export const loadUserTransactions = () => {
    return (dispatch) => {
        axios.get('http://localhost:8000/api/users/transactions')
            .then(res => {
                //console.log(res.data);
                dispatch(loadUserTransactionSuccess(res.data));
            }).catch(error => {

            });
    }
}

export const loadUserTransactionDetailSuccess = (transactionID,data) => {
    return {
        type: LOAD_USER_DETAIL_TRANSACTIONS_SUCCESS,
        id: transactionID,
        payload: data
    }
}

export const loadUserTransactionsDetail = (transactionID) => {
    return (dispatch) => {
        axios.get('http://localhost:8000/api/users/transactions/detail/'+transactionID,{withCredentials: true})
            .then(res => {
                //console.log(res.data);
                dispatch(loadUserTransactionDetailSuccess(transactionID,res.data));
            }).catch(error => {

            });
    }
}