<script setup lang="ts">
import { useAppStore } from "@/store/app";
import { storeToRefs } from "pinia";
import TextField from "@/components/TextField.vue";
import ProductDetails from "@/components/ProductDetails.vue";
import ProductTimeline from "@/components/ProductTimeline.vue";
const store = useAppStore();
const { getIsLoading, getProduct, getTracking, getError } = storeToRefs(store);
const { getProductData } = store;
</script>
<template>
  <v-container class="py-16">
    <v-row>
      <v-col cols="12" lg="12" md="12" xl="10" class="mx-auto">
        <h1 class="my-3 text-grey-darken-3">Search Kezzler Code</h1>
        <TextField
          label="Code"
          type="text"
          name="code"
          :isLoading="getIsLoading"
          :onSubmitHandler="getProductData"
        />
        <p class="text-red-lighten-2" v-if="getError">{{ getError }}</p>
      </v-col>
    </v-row>
    <v-row v-if="getProduct && getTracking" class="justify-center">
      <v-col cols="12" lg="4" md="4" xl="4">
        <ProductDetails
          :details="getProduct"
          :packageDetails="getTracking?.self.packageType"
        />
      </v-col>
      <v-col cols="12" lg="8" md="8" xl="6">
        <ProductTimeline :timeline="getTracking" />
      </v-col>
    </v-row>
  </v-container>
</template>
<style lang="scss" scoped></style>
