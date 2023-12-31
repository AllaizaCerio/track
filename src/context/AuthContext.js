import AsyncStorage from '@react-native-async-storage/async-storage';
import createDataContext from "./createDataContext";
import trackerApi from '../api/tracker';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
    switch (action.type){
        case 'add_error':
            return {...state, errorMessage: action.payload};
        case 'signin':
            return {errorMessage:'', token:action.payload};
        case 'clear_error_message':
            return {...state, errorMessage: ''};
        case 'signout':
            return { token: null, errorMessage: '' };
        default:
            return state;
    }
};

const clearErrorMessage = dispatch => () => {
    dispatch({ type: 'clear_error_message' });
};

const signup = (dispatch) => async ({ email, password }) => {
        // make API request to sign up w/ email and password
        // if we sign up, modify our state and say that we are authenticated
        // if signing up fails, we need to reflect an error message somewhere
    try{
        const response = await trackerApi.post('/signup', { email, password });
        await AsyncStorage.setItem('token', response.data.token);
        console.log(response.data);
        dispatch({ type: 'signin', payload: response.data.token })

        navigate('TrackList');
    } catch (err){
        dispatch({ type: 'add_error', payload: 'Something went wrong with sign up'});        
    }    
};

const tryLocalSignin = dispatch => async() => {
    const token = await AsyncStorage.getItem('token');

    if(token){
        dispatch({ type:'signin', payload: token});
        navigate('TrackList');
    }
    else{
        navigate('Signup');
    }
};

const signin = (dispatch) => async ({ email, password }) => {
        // make API request to sign in w/ email and password
        // Handle success by updating state
        // if signing up fails, we need to reflect an error message somewhere
    try{
        const response = await trackerApi.post('/signin', { email, password });
        await AsyncStorage.setItem('token', response.data.token);
        dispatch({ type: 'signin', payload: response.data.token });
        navigate('TrackList');

    } catch (err){
        console.log(err);
        dispatch({
            type: 'add_error',
            payload: 'Something went wrong with sign in'
        });
    }
};

const signout = (dispatch) => async() => {
   await AsyncStorage.removeItem('token');
   dispatch({ type: 'signout'});
   navigate('loginFlow');
};

export const { Provider, Context } = createDataContext(
    authReducer,
    { clearErrorMessage, signin, signout, signup, tryLocalSignin },
    { token: null, errorMessage: '' }
);

// <NavigationEvents onWillFocus={clearErrorMessage}