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
              {{ selectedFeedback.name }} (<a
                :href="`mailto:${selectedFeedback.email}`"
                >{{ selectedFeedback.email }}</a
              >)
            </p>
          </div>
          <img
            class="cursor-pointer"
            alt="SUGGESTION"
            src="../assets/delete.svg"
            @click="() => setDeleteModal(true)"
          />
        </div>
        <p class="text-gray-700 mb-4">
          {{ selectedFeedback.message }}
        </p>
      </div>
      <ModalComponent
        title="Delete Feedback"
        :is-open="deleteModalOpened"
        :close="() => setDeleteModal(false)"
        :submit="() => submitDeleteFeedback(selectedFeedback?.id)"
      >
        Are you sure you want to delete this feedback?
      </ModalComponent>
    </template>
  </div>
</template>
<script setup lang="ts">
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import { Feedback } from '../types.ts';
import FeedbackProvider from '../providers/FeedbackProvider.ts';
import { computed, ref } from 'vue';
import { useFeedbackStore } from '../stores/FeedbackStore.ts';
import { formatDistanceToNow } from 'date-fns';
import ModalComponent from './UI/ModalComponent.vue';
const queryClient = useQueryClient();

const { data } = useQuery({
  queryKey: ['feedback'],
  queryFn: () => {
    return FeedbackProvider.getAllFeedbacks();
  },
});

const feedbackDeleteMutation = useMutation({
  mutationFn: (id: string) => {
    return FeedbackProvider.deleteFeedback(id);
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['feedback'] });
  },
});

const feedbackStore = useFeedbackStore();

const selectedFeedback = computed<Feedback | undefined>(() => {
  return data.value?.data
    ? data.value.data.find(
        (feedback) => feedback.id === feedbackStore.selectedFeedbackId,
      )
    : undefined;
});

const deleteModalOpened = ref(false);
const setDeleteModal = (val: boolean) => {
  deleteModalOpened.value = val;
};

const getTimeAgo = (date: string) =>
  formatDistanceToNow(new Date(date), { addSuffix: true });

const submitDeleteFeedback = async (id?: string) => {
  if (id) {
    await feedbackDeleteMutation.mutateAsync(id);
  }

  setDeleteModal(false);
};
</script>
