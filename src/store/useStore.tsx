import { create } from 'zustand'
import { Insurance } from '../interfaces/insurance';

interface InsuranceState {
  insurances: Insurance[],
  insuranceEdit: Insurance,
  modalStatus: boolean,
  add: (insurance: Insurance) => void,
  update: (insurance: Insurance) => void,
  remove: (id: number) => void,
  findById: (id: number) => void,
  removeAll: () => void,
  changeModalStatus: (status: boolean) => void
  finishEdit: () => void
}

export const useStore = create<InsuranceState>()( (set) => ({
    insurances: [],
    insuranceEdit: {},
    add: (newInsurance) => set((state) => ({insurances : [...state.insurances, newInsurance]})),
    update: (updateInsurance) => set((state) => ({insurances : state.insurances.map((insurance) => (insurance.id === updateInsurance.id ? updateInsurance : insurance)) })),
    remove: (id) => set((state) => ({insurances : state.insurances.filter((insurance) => insurance.id !== id)})),
    findById: (id) => set((state) => ({insuranceEdit : state.insurances.find((insurance) => insurance.id == id)})),
    removeAll: () => set(({insurances : []})),
    finishEdit: () => set(({insuranceEdit : {}})),
    modalStatus: false,
    changeModalStatus: (status) => set({modalStatus: status}),
}))