<template>
  <div class="bg-white p-8">
    <template v-if="selectedFeedback">
      <div class="max-w-3xl mx-auto">
        <div class="flex items-center space-x-3 mb-4">
          <template v-if="selectedFeedback.feedbackType === 'BUG'">
            <img alt="BUG" src="../assets/bug.svg" />
          </template>
          <template v-if="selectedFeedback.feedbackType === 'SUGGESTION'">
            <img alt="SUGGESTION" src="../assets/suggestion.svg" />
          </template>
          <div>
            <p class="text-sm text-gray-500">
              {{ getTimeAgo(selectedFeedback.createdAt) }}
            </p>
            <h1 class="text-xl font-semibold">{{ selectedFeedback.title }}</h1>
            <p class="text-sm text-gray-500">
              {{ selectedFeedback.name }} ({{ selectedFeedback.email }})
            </p>
          </div>
          <img
            class="cursor-pointer"
            alt="SUGGESTION"
            src="../assets/delete.svg"
            @click="feedbackDeleteMutation.mutate(selectedFeedback.id)"
          />
        </div>
        <p class="text-gray-700 mb-4">
          {{ selectedFeedback.message }}
        </p>
      </div>
    </template>
  </div>
</template>
<script setup lang="ts">
import {useQuery, useMutation, useQueryClient} from '@tanstack/vue-query';
import { Feedback } from '../types.ts';
import FeedbackProvider from '../providers/FeedbackProvider.ts';
import { computed } from 'vue';
import { useFeedbackStore } from '../stores/FeedbackStore.ts';
import { formatDistanceToNow } from 'date-fns';
const queryClient = useQueryClient()

const { data } = useQuery<Feedback[]>({
  queryKey: ['feedback'],
  queryFn: FeedbackProvider.getAllFeedbacks,
});

const feedbackDeleteMutation = useMutation({
  mutationFn: (id: string) => {
    return FeedbackProvider.deleteFeedback(id);
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['feedback'] })
  },
});

const feedbackStore = useFeedbackStore();

const selectedFeedback = computed<Feedback | undefined>(() => {
  return data.value
    ? data.value.find(
        (feedback) => feedback.id === feedbackStore.selectedFeedbackId,
      )
    : undefined;
});

const getTimeAgo = (date: string) =>
  formatDistanceToNow(new Date(date), { addSuffix: true });
</script>
