import { create } from 'zustand';

const usePropertiesStore = create((set) => ({
  rowsInOnePage: 3,
  columnsInOnePage: 3,
  iconHeight: 50,
  iconWidth: 50,
  pickerHeight: 500,
  pickerWidth: 500,
  setRowsInOnePage: (rows) => {
    set((state) => {
      return { ...state, rowsinOnePage: rows };
    });
  },
  setColumnsInOnePage: (columns) => {
    set((state) => {
      return { ...state, columnsInOnePage: columns };
    });
  },
  setIconHeight: (height) => {
    set((state) => {
      return { ...state, iconHeight: height };
    });
  },
  setIconWidth: (width) => {
    set((state) => {
      return { ...state, iconWidth: width };
    });
  },
  setPickerHeight: (height) => {
    set((state) => {
      return { ...state, pickerHeight: height };
    });
  },
  setPickerWidth: (width) => {
    set((state) => {
      return { ...state, pickerWidth: width };
    });
  },
}));

export default usePropertiesStore;
