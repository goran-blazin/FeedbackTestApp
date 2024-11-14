<template>
  <div
    class="px-4 py-3 border-b border-gray-200 cursor-pointer flex items-center space-x-2"
    :class="[
      feedbackStore.selectedFeedbackId === feedback.id
        ? 'bg-slate-300'
        : 'hover:bg-slate-200',
    ]"
    @click="feedbackStore.setSelectedFeedbackId(feedback.id)"
  >
    <template v-if="feedback.feedbackType === 'BUG'">
      <img alt="BUG" src="../assets/bug.svg" />
    </template>
    <template v-if="feedback.feedbackType === 'SUGGESTION'">
      <img alt="SUGGESTION" src="../assets/suggestion.svg" />
    </template>
    <div class="flex-grow">
      <h2 class="text-sm font-medium">{{ feedback.title }} test</h2>
      <div class="flex justify-between items-center">
        <div class="text-xs text-gray-500">{{ feedback.name }}</div>
        <div class="text-xs text-gray-500">{{ timeAgo }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Feedback } from '../types.ts';
import { formatDistanceToNow } from 'date-fns';
import { computed } from 'vue';
import { useFeedbackStore } from '../stores/FeedbackStore.ts';

const { feedback } = defineProps<{ feedback: Feedback }>();
const timeAgo = computed(() => {
  return formatDistanceToNow(new Date(feedback.createdAt), { addSuffix: true });
});

const feedbackStore = useFeedbackStore();
</script>
