import { FormEvent } from "react";
import { useState } from "react";
import { useForm } from "../hooks/useForm";
import { ErrorField } from "../interfaces/errorFields";
import { useStore } from "../store/useStore";
import { FormInsurance } from "./FormInsurance";
import { Insurance } from '../interfaces/insurance';
import { useMutation } from "@tanstack/react-query";
import insuranceService from "../services/insurance.service";

export const AddInsurance = () => {
  const { add } = useStore();

  const create = useMutation((insurance: Insurance) => {
    return insuranceService.create(insurance);
  });

  const addInsurance = async (insurance: Insurance) => {
        const {succeeded} = await create.mutateAsync(insurance);
        if (succeeded) {
          add(insurance);
        }
        
  }

  return (
    <FormInsurance
    initialFormValues={{ name: "", fee: 0 }}
    action={addInsurance}
    >
      <div>
        <button
          className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          type="submit"
       >
          Añadir Aseguradora
        </button>
        
      </div>
    </FormInsurance>
  );
};
