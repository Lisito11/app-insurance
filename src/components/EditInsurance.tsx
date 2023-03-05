import { useStore } from "../store/useStore";
import { FormInsurance } from "./FormInsurance";
import { Insurance } from '../interfaces/insurance';
import { useMutation } from '@tanstack/react-query';
import insuranceService from "../services/insurance.service";

export const EditInsurance = () => {
  const { update, insuranceEdit, finishEdit } = useStore();

  const updateApi = useMutation((insurance: Insurance) => {
    return insuranceService.update(insurance, insurance.id!);
  });

  const editInsurance = async (insurance: Insurance) => {
    insurance.id = insuranceEdit.id;

    const status = await updateApi.mutateAsync(insurance);
    if (status == 204) {
      update(insurance);
      finishEdit();
    }

  }


  return (
    <FormInsurance
      initialFormValues={{ name: insuranceEdit.name, fee: (insuranceEdit.fee! * 100) }}
      action={editInsurance}
    >
      <div>
        <button
          className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          type="submit"
        >
          Editar Aseguradora
        </button>
        <button
          className="text-white mx-3 bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          onClick={finishEdit}
        >
          Cancelar
        </button>
      </div>
    </FormInsurance>
  );
};
