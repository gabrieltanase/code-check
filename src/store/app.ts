// Utilities
import { defineStore } from "pinia";
import axios from "axios";
import { Product, Timeline, Error } from "../models/Product";

interface State {
  product: Product | null;
  timeline: Timeline | null;
  isLoading: boolean;
  error: Error | null;
}

export const useAppStore = defineStore("app", {
  state: (): State => ({
    product: null,
    timeline: null,
    isLoading: false,
    error: null,
  }),
  getters: {
    getIsLoading: (state) => state.isLoading,
    getProduct: (state) => state.product,
    getTracking: (state) => state.timeline,
    getError: (state) => state.error?.message,
  },
  actions: {
    async getProductData(code: string): Promise<void> {
      this.$reset();
      this.$patch({
        isLoading: true,
      });
      try {
        const [productDetails, productTimeline] = await Promise.all([
          getProductDetails([code]),
          getTimelineDetails(code),
        ]);
        this.$patch({
          product: productDetails.data[0],
          timeline: productTimeline.data,
        });
      } catch (error) {
        if (axios.isAxiosError<Record<string, unknown>>(error)) {
          console.error(error.response);
          this.$patch({
            error: error.response?.data || {
              code: error.response?.status,
              message: `${error.response?.statusText}. Please try again later.`,
            },
          });
        } else {
          this.$patch({
            error: { message: "Something went wrong. Please try again later" },
          });
          console.error(error);
        }
      } finally {
        this.$patch({ isLoading: false });
      }
    },
  },
});

// test service TODO: move this in services file

// TODO: move in ENV
const auth = {
  username: "candidate",
  password: "supersecret",
};

const getTimelineDetails = (code: string) => {
  return axios.get(`/api/compass-ws-rest/trace/${code}`, { auth });
};

const getProductDetails = (codes: Array<string>) => {
  return axios.post("/api/code-authentication/v2/batch", { codes }, { auth });
};
