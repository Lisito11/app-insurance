type Props = {
    title: string,
    children?: string | JSX.Element | JSX.Element[],
    cancel: () => void, 
    ok: () => void
}

export const Alert = ({title, children, ok, cancel} : Props) => {
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto bg-black bg-opacity-50">
    <div className="flex flex-col justify-center items-center">
      <div className="w-1/4 overflow-hidden shadow-xl rounded-lg bg-white my-3" aria-modal="true" aria-labelledby="modal-headline">

        <div className="flex justify-between border-b border-gray-100 px-5 py-4">
          <div>
            <i className="fa fa-exclamation-triangle text-orange-500"></i>
            <span className=" text-2xl">{title}</span>
          </div>
          
        
        </div>
        
        {children}

        <div className="px-5 py-4 flex justify-end">
          <button className="bg-blue-500 mr-1 rounded text-lg py-2 px-3 text-white hover:bg-blue-600 transition duration-150 w-full" onClick={ok}>
            Aceptar
          </button>

          <button className="bg-red-500 mr-1 rounded text-lg py-2 px-3 text-white hover:bg-red-600 transition duration-150 w-full" onClick={cancel}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}
