<script setup lang="ts">
import { ProductErrors } from "@/models/Product";
defineProps<{
  errors: Array<ProductErrors>;
}>();
</script>
<template lang="">
  <v-row align="center" no-gutters v-for="(error, i) of errors" :key="i">
    <v-col cols="12" xl="8">
      <div
        class="rounded-lg d-flex align-center justify-space-between pa-3"
        :class="{
          'bg-red-lighten-2': error.code === 108,
          'bg-orange-lighten-2': error.code === 110,
        }"
      >
        <p class="d-flex">
          <v-icon icon="mdi-alert-circle-outline" color="danger" class="mr-3" />
          <span>{{ error.message }}</span>
        </p>
      </div>
    </v-col>
  </v-row>
</template>
<style lang="scss" scoped></style>
