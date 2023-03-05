import { useState } from 'react';
import { ErrorField } from '../interfaces/errorFields';

export const useHandleError = ({...rest}) : {error: ErrorField, hideError: () => void} => {
    
    const [error, setError] = useState<ErrorField>({status:false});
    
    const hideError = () => setError({status: false});

    if (!rest.name) { setError({status: true, msg:'Debes de escribir el nombre de la aseguradora', field: 'name'}); return {error, hideError} ;}

    if (rest.name.length >= 45) { setError({status: true, msg:'El nombre debe de tener menos de 45 caracteres.', field: 'name'}); return {error, hideError} ;}
    
    if (rest.fee > 25) {setError({status: true, msg:'La comisión no puede ser mayor de 25%', field: 'fee'});  return {error, hideError} ; }

    if (rest.fee <= 0) {setError({status: true, msg:'La comisión no puede ser menor que 1%', field: 'fee'});  return {error, hideError}; }



    return {error, hideError};

}
