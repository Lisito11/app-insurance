import { FormEvent } from "react";
import { useState } from "react";
import { useForm } from "../hooks/useForm";
import { ErrorField } from "../interfaces/errorFields";
import { Insurance } from '../interfaces/insurance';

type Props = {
  children: string | JSX.Element | JSX.Element[];
  initialFormValues: Object
  action: (insurance: Insurance) => void
};

export const FormInsurance = ({ children, action, initialFormValues }: Props) => {

  const [values, handleInputChange] = useForm(initialFormValues);
  const [status, setStatus] = useState(true);
  const [error, setError] = useState<ErrorField>({ status: false });
  const { name, fee } = values;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError({ status: false });

    const feeDecimal = Number((fee / 100).toFixed(2));
    
    if (!name) {
      setError({
        status: true,
        msg: "Debes de escribir el nombre de la aseguradora",
        field: "name",
      });
      return;
    }

    if (name.length >= 45) {
      setError({
        status: true,
        msg: "El nombre debe de tener menos de 45 caracteres.",
        field: "name",
      });
      return;
    }

    if (fee > 25) {
      setError({
        status: true,
        msg: "La comisión no puede ser mayor de 25%",
        field: "fee",
      });
      return;
    }

    if (fee <= 0) {
      setError({
        status: true,
        msg: "La comisión no puede ser menor que 1%",
        field: "fee",
      });
      return;
    }

    const insurance: Insurance = {
        id: Number(new Date().getMilliseconds()),
        name, 
        fee: feeDecimal,
        status
    }

    action(insurance);
  };

  return (
    <div className="w-1/2 mx-auto">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium">Aseguradora</label>
          <input
            type="text"
            name="name"
            value={name}
            autoComplete="off"
            onChange={handleInputChange}
            className="border border-blue-400  text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400 block w-full p-2.5"
            placeholder="Escribe el nombre del seguro"
          />
          {error.status && error.field == "name" && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              <span className="font-medium">Ups!</span> {error.msg}
            </p>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="username-error"
            className="block mb-2 text-sm font-medium"
          >
            Comisión
          </label>
          <div className="flex flex-row">
            <input
              type="number"
              name="fee"
              value={fee}
              onChange={handleInputChange}
              placeholder="Escribe la comisión en %"
              id="username-error"
              className="border border-blue-400  text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400 block w-full p-2.5"
            />
            <span className="text-xl p-2 border rounded-lg bg-slate-400">
              %
            </span>
          </div>

          {error.status && error.field == "fee" && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              <span className="font-medium">Ups!</span> {error.msg}
            </p>
          )}
        </div>
        <div className="mb-6">
          <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
            <input
              type="checkbox"
              name="status"
              id="toggle"
              checked={status}
              onChange={(e) => setStatus(e.target.checked)}
              className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
            />
            <label
              htmlFor="toggle"
              className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
            ></label>
          </div>
          <label htmlFor="toggle" className="text-xs text-gray-700">
            Estado
          </label>
        </div>
        {children}
      </form>
    </div>
  );
};
