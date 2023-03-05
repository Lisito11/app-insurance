import React from 'react'

type Props = {
    itemsPerPage: number,
    totalItems: number,
    paginateFront: () => void ,
    paginateBack: () => void,
    currentPage: number,
}

export const Pagination = ({
    itemsPerPage,
    totalItems,
    paginateFront,
    paginateBack,
    currentPage,
  }: Props) => {
    return (
        <div className='mx-6 my-6'>
          <div>
            <p className='text-sm text-gray-700'>
              Mostrando desde {" "}
              <span className='font-medium'>{currentPage * itemsPerPage - 10 + 1}</span>
              {" "} al {" "}
              <span className='font-medium'> {(currentPage * itemsPerPage) > totalItems ? totalItems : (currentPage * itemsPerPage)} </span>
              de {" "}
              <span className='font-medium'> {totalItems} </span>
              resultados
            </p>
          </div>
          <nav className='block'></nav>
          <div>
            <nav
              className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px'
              aria-label='Pagination'
            >
              <button
                onClick={() =>  paginateBack()}
                className='relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
              >
                <span>Anterior</span>
              </button>
    
              <button
                onClick={() => paginateFront()}
                className='relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
              >
                <span>Siguiente</span>
              </button>
            </nav>
          </div>
        </div>
      );
}
