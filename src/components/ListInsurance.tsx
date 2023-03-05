import { useStore } from "../store/useStore";
import { useEffect, useState } from "react";
import { Alert } from "./Alert";
import { Pagination } from "./Pagination";
import { usePagination } from "../hooks/usePagination";
import { useQuery, useMutation } from "@tanstack/react-query";
import insuranceService from "../services/insurance.service";
import { Loading } from "./Loading";

export const ListInsurance = () => {
  const { insurances, modalStatus, changeModalStatus, remove, findById, add, removeAll } =
    useStore();

  const { status, data } = useQuery(["insurances"], insuranceService.getAll);

  const deleteApi = useMutation((id: number) => {
    return insuranceService.delete(id);
  });

  useEffect(() => {
    if (status === "success") {
      removeAll();
      data.forEach((insurance) => {
        add(insurance);
      });
    }
  }, [status, data]);

  const [id, setId] = useState(0);

  const okDelete = async () => {
    const status = await deleteApi.mutateAsync(id);
    if (status == 204) {
      remove(id);
      changeModalStatus(false);
    }
  };

  const askDelete = (id: number) => {
    setId(id);
    changeModalStatus(true);
  };

  const {
    itemsPerPage,
    currentPage,
    paginateFront,
    paginateBack,
    currentItems,
  } = usePagination();

  return status === "success" ? (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5 w-full">
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Nombre
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Comisión
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Estado
            </th>
            <th
              scope="col"
              className="px-6 py-4 font-medium text-gray-900"
            ></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {currentItems.map(({ id, name, status, fee }) => (
            <tr className="hover:bg-gray-50" key={id}>
              <td className="px-8 py-4">{name}</td>
              <td className="px-6 py-4">{fee! * 100}%</td>
              <td className="px-6 py-4">
                {status && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                    Activo
                  </span>
                )}

                {!status && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-600"></span>
                    Inactivo
                  </span>
                )}
              </td>

              <td className="px-6 py-4">
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => {
                      askDelete(id!);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-6 w-6"
                      x-tooltip="tooltip"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => {
                      findById(id!);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-6 w-6"
                      x-tooltip="tooltip"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {insurances.length > 0 && (
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={insurances.length}
          paginateBack={paginateBack}
          paginateFront={paginateFront}
          currentPage={currentPage}
        />
      )}

      {modalStatus && (
        <Alert
          title="Eliminar Aseguradora"
          ok={() => okDelete()}
          cancel={() => {
            changeModalStatus(false);
          }}
          children={<p className="m-5">¿Desea eliminar esta aseguradora?</p>}
        />
      )}
    </div>
  ) : (
    <Loading />
  );
};
