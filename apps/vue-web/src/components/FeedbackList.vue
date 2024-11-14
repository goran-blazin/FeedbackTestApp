<template>
  <template v-if="allFeedbacks">
    <div class="px-4 py-4 border-b border-gray-200">
      <div class="flex justify-between items-center">
        <div class="flex items-center">
          <label for="reporter" class="text-gray-500">Filter</label>
          <select
            id="reporter"
            class="bg-slate-200 text-gray-500 rounded focus:outline-none focus:ring focus:ring-blue-200 ml-2"
            :value="filterByReporter || ''"
            @change="
              (event) =>
                feedbackStore.setFilterByReporter(
                  (event.target as HTMLSelectElement)?.value,
                )
            "
          >
            <option value="">Reporter</option>
            <template v-for="reporter in reporters" :key="reporter">
              <option :value="reporter">{{ reporter }}</option>
            </template>
          </select>
        </div>
        <div class="flex space-x-2">
          <label for="reporter" class="text-gray-500">Sort</label>
          <select
            id="reporter"
            class="bg-slate-200 text-gray-500 rounded focus:outline-none focus:ring focus:ring-blue-200 ml-2"
            @change="
              (event) =>
                feedbackStore.setSortByDate(
                  (event.target as HTMLSelectElement)?.value as
                    | 'ASC'
                    | 'DESC'
                    | undefined,
                )
            "
            :value="sortByDate || ''"
          >
            <option value="">Date</option>
            <option value="ASC">Asc</option>
            <option value="DESC">Desc</option>
          </select>
        </div>
      </div>
    </div>

    <div class="overflow-y-auto flex-grow" v-if="filteredFeedbacks">
      <template v-for="feedback in filteredFeedbacks" :key="feedback.id">
        <FeedbackListItem :feedback="feedback" />
      </template>
    </div>
    <div class="overflow-y-auto flex-grow" v-else>LOADING...</div>

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
  <template v-else>
    <div class="flex justify-between items-center">LOADING...</div>
  </template>
</template>
<script setup lang="ts">
import FeedbackListItem from './FeedbackListItem.vue';
import { Feedback } from '../types.ts';

import { useQuery } from '@tanstack/vue-query';
import FeedbackProvider from '../providers/FeedbackProvider.ts';
import { computed, watch } from 'vue';
import { useFeedbackStore } from '../stores/FeedbackStore.ts';
import _ from 'lodash';
import { storeToRefs } from 'pinia';

const feedbackStore = useFeedbackStore();
const { filterByReporter, sortByDate } = storeToRefs(feedbackStore);

const { data: filteredFeedbacks } = useQuery<Feedback[]>({
  queryKey: ['feedback', filterByReporter, sortByDate],
  queryFn: () => {
    return FeedbackProvider.getAllFeedbacks({
      filterByReporter: filterByReporter?.value,
      sortByDate: sortByDate?.value,
    });
  },
});

const { data: allFeedbacks } = useQuery<Feedback[]>({
  queryKey: ['feedback'],
  queryFn: () => {
    return FeedbackProvider.getAllFeedbacks();
  },
});

const reporters = computed(() => {
  if (Array.isArray(allFeedbacks.value)) {
    return _.uniq(allFeedbacks.value.map((feedback) => feedback.name));
  } else {
    return [];
  }
});

watch(filteredFeedbacks, () => {
  if (
    Array.isArray(filteredFeedbacks.value) &&
    filteredFeedbacks.value.length > 0 &&
    !feedbackStore.selectedFeedbackId
  ) {
    feedbackStore.setSelectedFeedbackId(filteredFeedbacks.value[0].id);
  }
});
</script>
