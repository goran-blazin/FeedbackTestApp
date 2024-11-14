<template>
  <div
    class="flex items-center justify-between bg-slate-50 p-4 border-b border-gray-200"
  >
    <div class="flex items-center space-x-2">
      <img src="../assets/checkIcon.svg" alt="checkIcon" />
    </div>
    <div class="flex-1 mx-4"></div>
    <GreenButton @click="() => setCreateModalOpened(true)"
      >New Feedback</GreenButton
    >
    <FeedbackFormModal
      :is-open="createModalOpened"
      :close="() => setCreateModalOpened(false)"
    />
  </div>
</template>

<script setup lang="ts">
import GreenButton from './UI/GreenButton.vue';
import FeedbackFormModal from './FeedbackFormModal.vue';
import { ref } from 'vue';

const createModalOpened = ref(false);
const setCreateModalOpened = (open: boolean) => {
  createModalOpened.value = open;
};
</script>
