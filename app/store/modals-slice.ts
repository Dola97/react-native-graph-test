import {createSlice} from '@reduxjs/toolkit';
export interface customerModel {
  attr: {
    name: string;
    contact: string;
    notes: string;
    organization: string;
  };

  id: string;
}
interface modalsState {
  [key: string]: {isOpen: boolean; customer: customerModel | undefined};
}

const initialState: modalsState = {
  addcustomer: {isOpen: false, customer: undefined},
  addTask: {isOpen: false, customer: undefined},
  selectCustomer: {isOpen: false, customer: undefined},
};

const ModalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setModal: (state, action) => {
      const {name, value} = action.payload;
      state[name] = value;
    },
  },
});

export const {setModal} = ModalsSlice.actions;

export default ModalsSlice.reducer;
