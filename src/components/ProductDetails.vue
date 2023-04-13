<script setup lang="ts">
import { defineProps } from "vue";
import { Product } from "@/models/Product";
import StaticDetailItem from "./StaticDetailItem.vue";
import StaticError from "./StaticError.vue";

defineProps<{
  details: Product;
  packageDetails: { name: string; type: string; material: string } | undefined;
}>();

// This can be simplified without icons and parse the actual key in the loop from api return object
// Just for demo purposes
// TODO: Can be moved to CONSTANTS file
const detailsMap = {
  batchID: {
    label: "Batch Id",
    icon: "mdi-package-variant",
  },
  intendedMarket: {
    label: "IntendedMarket",
    icon: "mdi-map-marker-outline",
  },
  expiryDate: {
    label: "ExpireDate",
    icon: "mdi-calendar-month-outline",
  },
  lastQualityDate: {
    label: "Last Quality Date",
    icon: "mdi-calendar-month-outline",
  },
  manufacturingDate: {
    label: "Manufacturing Date",
    icon: "mdi-package-variant",
  },
  productName: {
    label: "Name",
    icon: "mdi-package-variant",
  },
  milkCollectionDate: {
    label: "Milk Collection Date",
    icon: "mdi-calendar-month-outline",
  },
  customsClearanceCertificateData: {
    label: "Customs Clearance Certificate Date",
    icon: "mdi-file-sign",
  },
};
</script>
<template>
  <div class="d-flex flex-lg-row flex-sm-column align-center mb-3">
    <h1 class="text-grey-darken-3 mr-4">
      {{ details.metadata?.data.productName }}
    </h1>
    <span class="text-grey-lighten-1 text-h5">({{ details.code }})</span>
  </div>

  <!-- PACKAGE DETAILS -->
  <div
    class="d-flex justify-space-between border-grey-lighten-3 pa-3 rounded-lg mb-10 border-gray"
    v-if="packageDetails"
  >
    <div v-for="(item, key, index) in packageDetails" :key="index">
      <span>
        <span class="capitalize">{{ key.toLowerCase() }} </span>
        <span>: </span>
        <span class="text-grey-lighten-1">{{ item }}</span>
      </span>
    </div>
  </div>

  <!-- PROD DETAILS -->
  <section v-if="details.metadata">
    <StaticDetailItem
      v-for="(data, key, index) in details.metadata?.data"
      :key="index"
      :label="detailsMap[key].label"
      :value="data"
      :icon="detailsMap[key].icon"
    />
    <StaticError :errors="details.result.errors" />
  </section>
</template>
<style lang="scss" scoped>
.capitalize {
  display: inline-block;
  &:first-letter {
    text-transform: uppercase;
  }
}
.border-gray {
  border: 1px solid #eeeeee;
}
</style>
