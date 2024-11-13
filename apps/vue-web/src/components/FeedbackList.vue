<template>
  <!-- Header Section -->
  <div class="px-4 py-4 border-b border-gray-200">
    <div class="flex justify-between items-center">
      <span class="text-lg font-semibold">Feedback</span>
      <div class="flex space-x-2">
        <button class="text-gray-500">Filter</button>
        <button class="text-gray-500">Sort</button>
      </div>
    </div>
  </div>

  <div class="overflow-y-auto flex-grow" v-if="data">
    <template v-for="feedback in data" :key="feedback.id">
      <FeedbackListItem :feedback="feedback" />
    </template>
  </div>
  <div v-else class="overflow-y-auto flex-grow">LOADING...</div>

  <div class="p-4 border-t border-gray-200">
    <div class="flex justify-between items-center">
      <button class="text-gray-500 text-sm">&lt;</button>
      <div class="flex space-x-1">
        <button class="px-2 py-1 bg-blue-500 text-white rounded">1</button>
        <button class="px-2 py-1 text-gray-500">2</button>
        <button class="px-2 py-1 text-gray-500">3</button>
        <span class="px-2 py-1 text-gray-500">...</span>
        <button class="px-2 py-1 text-gray-500">10</button>
      </div>
      <button class="text-gray-500 text-sm">&gt;</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import FeedbackListItem from './FeedbackListItem.vue';
import { Feedback } from '../types.ts';

import { useQuery } from '@tanstack/vue-query';
import FeedbackProvider from '../providers/FeedbackProvider.ts';
import { watch } from 'vue';
import { useFeedbackStore } from '../stores/FeedbackStore.ts';

const feedbackStore = useFeedbackStore();

const { data } = useQuery<Feedback[]>({
  queryKey: ['feedback'],
  queryFn: FeedbackProvider.getAllFeedbacks,
});

watch(data, () => {
  if (Array.isArray(data.value) && data.value.length > 0) {
    feedbackStore.setSelectedFeedbackId(data.value[0].id);
  }
});
</script>
