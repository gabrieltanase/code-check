<script setup lang="ts">
defineProps<{
  cssClasses?: Array<string>;
  label: String;
  value: String;
  icon?: any;
}>();
</script>
<template>
  <div class="mb-6">
    <v-row align="center" no-gutters>
      <v-col cols="12" xl="8">
        <p class="pa-3 bg-grey-lighten-5 rounded-lg mb-5 mr-xl-5 mb-xl-0 border-gray">
          <v-icon v-if="icon" :icon="icon" class="mr-3" />{{ label }}
        </p>
      </v-col>
      <v-col cols="12" xl="4">
        <p class="text-center text-xl-left">{{ value }}</p>
      </v-col>
    </v-row>
  </div>
</template>

<style lang="scss" scoped>
.border-gray {
  border: 1px solid #eeeeee;
}
</style>
