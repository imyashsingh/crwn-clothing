import {useState} from 'react';

import {signInAuthUserWithEmailAndPassword ,signInWithGooglePopup,createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import './sign-in-form.styles.scss';

const defaultFormFields = {
    email : '',
    password : '',
}

const SignInForm = ()=>{

    const [formFields , setFormFields] = useState(defaultFormFields);
    const {email,password} = formFields;

    const resetFormField = ()=>{
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () =>{
        await signInWithGooglePopup();
    }

    const handelsubmit = async(event) => {
        event.preventDefault();

        try{
            await signInAuthUserWithEmailAndPassword(email,password);
            
            resetFormField();      
        } catch(error){
            switch (error.code) {
                case 'auth/wrong-password':
                  alert('incorrect password for email');
                  break;
                case 'auth/user-not-found':
                  alert('no user associated with this email');
                  break;
                default:
                  console.log(error);
            }
        }
    };

    const handelChange = (event)=>{
        const {name,value} = event.target;
        setFormFields({...formFields, [name]: value});
    }

    return(
        <div className='sign-up-container'>
            <h2>Already have an account?</h2>
            <span>Sign In with your email and password</span>
            <form onSubmit={handelsubmit}>
               
                <FormInput label='Email' type='email' required onChange={handelChange} name = 'email' value={email} />

                <FormInput label='Password' type='password' required onChange={handelChange} name = 'password' value={password} />
                <div className='buttons-container'>
                    <Button type='submit'>Sign In</Button>
                    <Button type='button' buttonType='google' onClick = {signInWithGoogle}>Google sign in</Button>
                </div>
            </form>
        </div>
    );
}

export default SignInForm;