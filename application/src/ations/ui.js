import { types } from "../types/types";

export const loading = (loadingValue) => ({
    type: types.loading,
    payload: {
        loadingValue
    },
  });
  