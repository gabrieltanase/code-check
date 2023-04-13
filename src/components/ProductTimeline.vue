<script setup lang="ts">
import { Timeline } from "@/models/Product";
import dayjs from "dayjs";
defineProps<{
  timeline: Timeline;
}>();

const formatDate = (
  date: Date | string | number
): { date: string; time: string } => {
  return {
    date: dayjs(date).format("DD MMM YYYY"),
    time: `${dayjs(date).format("HH:ss A Z")} UTC`,
  };
};
</script>
<template>
  <v-timeline side="end" line-thickness="1" density="compact">
    <v-timeline-item
      v-for="(item, key, index) in timeline.events.event"
      :key="index"
      dot-color="indigo-accent-2"
      fill-dot
      size="20"
      width="100%"
    >
      <v-alert
        border="start"
        variant="flat"
        color="light-blue-lighten-5"
        width="100%"
        border-color="indigo-accent-2"
        :title="`${item.location.name} (${item.location.country.name})`"
        class="text-indigo-darken-4"
        icon="mdi-map-marker-outline"
      >
        <p>
          <span class="font-weight-medium">Lat:</span>
          {{ item.location.coordinates.latitude }} |
          <span class="font-weight-medium">Long:</span>
          {{ item.location.coordinates.longitude }}
        </p>
        <p class="mb-3">
          <span class="font-weight-medium">Date:</span>
          {{ formatDate(item.eventTime).date }} |
          {{ formatDate(item.eventTime).time }}
        </p>
        <div>
          <p class="font-weight-medium">Documents</p>
          <p>
            <v-icon icon="mdi mdi-circle-small" class="mr-1" /><span
              class="font-weight-medium"
              >Disposition:</span
            >
            {{ item.disposition }}
          </p>
          <p>
            <v-icon icon="mdi mdi-circle-small" class="mr-1" /><span
              class="font-weight-medium"
              >Biz Step:</span
            >
            {{ item.bizStep }}
          </p>
        </div>
      </v-alert>
    </v-timeline-item>
  </v-timeline>
</template>
<style lang="scss" scoped></style>
