
export const Navbar = () => {
  return (
    <nav className=" bg-sky-100 w-full flex relative justify-between items-center mx-auto px-8 h-20">
      <div className="inline-flex">
        <div>
          <img src="/seguro_logo.png" className="h-12"/>
        </div>
       <div>
          <p className="px-5 pt-2 font-bold text-xl tracking-wider"> Mantenimiento de Aseguradoras</p>
       </div>
      </div>
    </nav>
  );
};
