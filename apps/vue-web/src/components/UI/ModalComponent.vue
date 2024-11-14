<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50"
  >
    <div class="bg-white rounded-lg shadow-lg w-full max-w-lg relative">
      <div class="border-b border-gray-200 p-5">
        <h2 class="text-xl">{{ title }}</h2>
      </div>

      <div class="mb-4 p-5">
        <slot></slot>
      </div>

      <div class="text-right px-5 pb-5">
        <button
          @click="close"
          class="bg-gray-200 text-slate-800 px-4 py-2 mr-4 rounded hover:bg-gray-300"
        >
          Discard
        </button>
        <GreenButton @click="submit">{{
          submitButtonText || 'OK'
        }}</GreenButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import GreenButton from './GreenButton.vue';

defineProps<{
  title: string;
  isOpen: boolean;
  close: () => void;
  submit: () => void;
  submitButtonText?: string;
}>();
</script>
