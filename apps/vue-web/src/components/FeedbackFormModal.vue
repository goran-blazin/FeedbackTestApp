<template>
  <ModalComponent
    title="Add new feedback"
    :is-open="isOpen"
    :close="closeFormDialog"
    :submit="submit"
    submit-button-text="Send feedback"
  >
    <form>
      <div class="mb-4">
        <label for="name" class="block text-gray-700 font-medium mb-2"
          >Name</label
        >
        <input
          type="text"
          id="name"
          v-model="formData.name"
          class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      <div class="mb-4">
        <label for="email" class="block text-gray-700 font-medium mb-2"
          >Email</label
        >
        <input
          type="email"
          id="email"
          v-model="formData.email"
          class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      <div class="mb-4">
        <label for="type" class="block text-gray-700 font-medium mb-2"
          >Type</label
        >
        <select
          id="type"
          v-model="formData.feedbackType"
          class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-200"
        >
          <option disabled value="">Select type</option>
          <option value="BUG">Bug</option>
          <option value="SUGGESTION">Suggestion</option>
        </select>
      </div>

      <div class="mb-4">
        <label for="title" class="block text-gray-700 font-medium mb-2"
          >Title</label
        >
        <input
          type="text"
          id="title"
          v-model="formData.title"
          class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      <div class="mb-6">
        <label for="message" class="block text-gray-700 font-medium mb-2"
          >Message</label
        >
        <textarea
          id="message"
          v-model="formData.message"
          rows="4"
          class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-200"
        ></textarea>
      </div>
    </form>
    <div
      @click="() => (errors = [])"
      v-if="errors.length > 0"
      class="cursor-pointer fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg items-center animate-fade"
    >
      <div>Form has following errors:</div>
      <template v-for="error in errors" :key="error">
        <div>{{ error }}</div>
      </template>
    </div>
  </ModalComponent>
</template>

<script setup lang="ts">
import ModalComponent from './UI/ModalComponent.vue';
import { ref } from 'vue';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import FeedbackProvider from '../providers/FeedbackProvider.ts';
import { Feedback } from '../types.ts';
const queryClient = useQueryClient();

const feedbackCreateMutation = useMutation({
  mutationFn: (formData: Feedback) => {
    return FeedbackProvider.createFeedback(formData);
  },
  onSuccess: (res) => {
    if (res === true) {
      queryClient.invalidateQueries({ queryKey: ['feedback'] });
      closeFormDialog();
    } else {
      errors.value = Array.isArray(res.message)
        ? (res.message as string[])
        : ['Unknown error'];
    }
  },
});

const submit = async (): Promise<void> => {
  feedbackCreateMutation.mutate(formData.value as Feedback);
};

const closeFormDialog = () => {
  resetForm();
  close();
};

const emptyFormData = {
  name: '',
  email: '',
  feedbackType: '',
  title: ``,
  message: ``,
};
const formData = ref(emptyFormData);
const errors = ref<string[]>([]);

const resetForm = () => {
  formData.value = emptyFormData;

  errors.value = [];
};

const { close } = defineProps<{
  isOpen: boolean;
  close: () => void;
}>();
</script>
