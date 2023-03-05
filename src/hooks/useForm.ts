import { useState, ChangeEvent } from 'react';
import { Insurance } from '../interfaces/insurance';


export const useForm = (initialState : any)  => {

    const [values, setValues] = useState(initialState);

    const reset = () => {
        setValues(initialState);
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>{
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    return [values, handleInputChange, reset]
}