import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface ProductsState {
  filters: Record<string, unknown>;
  sortBy: "name" | "price";
}

const initialState: ProductsState = {
  filters: {},
  sortBy: "name",
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<ProductsState["filters"]>) {
      state.filters = action.payload;
    },
    setSortBy(state, action: PayloadAction<ProductsState["sortBy"]>) {
      state.sortBy = action.payload;
    },
  },
});

export const { setFilters, setSortBy } = productSlice.actions;
export default productSlice.reducer;
