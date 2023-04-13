<script setup lang="ts">
import { defineProps, toRef } from "vue";
import { useField, useForm } from "vee-validate";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  isLoading: {
    type: Boolean,
    required: false,
  },
  onSubmitHandler: {
    type: Function,
    required: true,
  },
});

const validateField = (value: string) => {
  const regExp = new RegExp(/^[A-Za-z0-9]*$/);

  if (!value) {
    return "This field is required";
  }

  if (!regExp.test(value)) {
    return "Code should contain only letters and numbers";
  }

  if (value.length < 10) {
    return "This field must contain 10 characters";
  }

  return true;
};
const { handleSubmit } = useForm();

const { value, handleBlur, errors } = useField(
  toRef(props, "name"),
  validateField
);

const onSubmit = handleSubmit((values, { resetForm }) => {
  props.onSubmitHandler(values.code);
  // resetForm();
});
</script>

<template>
  <v-form @submit.prevent="onSubmit">
    <v-text-field
      v-model="value"
      @blur="handleBlur"
      :label="label"
      :error-messages="errors"
      :type="type"
      :loading="isLoading"
      append-inner-icon="mdi-magnify"
      @click:append-inner="onSubmit"
      variant="outlined"
    />
  </v-form>
</template>
