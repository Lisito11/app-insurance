import { AppLayout } from '../layouts/AppLayout';
import { ListInsurance } from '../components/ListInsurance';
import { useStore } from '../store/useStore';
import { EditInsurance } from '../components/EditInsurance';
import { AddInsurance } from '../components/AddInsurance';


export const HomePage = () => {
  const {insuranceEdit} = useStore();
  return (
    <AppLayout>
     <div className='flex md:flex-row justify-between flex-col space-x-1'>
      {insuranceEdit.name == undefined ?  <AddInsurance/> : <EditInsurance /> }
      <ListInsurance />
     </div>
     
    </AppLayout>
  )
}