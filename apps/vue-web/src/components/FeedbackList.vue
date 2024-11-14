<template>
  <template v-if="allFeedbacks?.data">
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
          <label for="sortDate" class="text-gray-500">Sort</label>
          <select
            id="sortDate"
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
            <option value="ASC">Old to New</option>
            <option value="DESC">New to Old</option>
          </select>
        </div>
      </div>
      <div class="flex justify-between items-center mt-1">
        <div>
          <label for="perPage" class="text-gray-500">View per page</label>
          <select
            id="perPage"
            class="bg-slate-200 text-gray-500 rounded focus:outline-none focus:ring focus:ring-blue-200 ml-2"
            v-model="perPage"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="20">50</option>
          </select>
        </div>
      </div>
    </div>

    <div class="overflow-y-auto flex-grow" v-if="filteredFeedbacks?.data">
      <template v-for="feedback in filteredFeedbacks?.data" :key="feedback.id">
        <FeedbackListItem :feedback="feedback" />
      </template>
    </div>
    <div class="overflow-y-auto flex-grow" v-else>LOADING...</div>

    <div class="p-4 border-t border-gray-200">
      <div class="flex place-content-center items-center">
        <button
          class="px-3 py-1 border text-gray-500 bg-white"
          @click="
            () => pageNumber > 1 && feedbackStore.setPageNumber(pageNumber - 1)
          "
        >
          &lt;
        </button>
        <div class="flex">
          <template v-for="page in pages" :key="page">
            <button
              class="px-3 py-1 border text-gray-700"
              :class="[
                pageNumber === page
                  ? 'bg-green-600 text-white'
                  : 'text-gray-500 bg-white',
              ]"
              @click="() => feedbackStore.setPageNumber(page)"
            >
              {{ page }}
            </button>
          </template>
        </div>
        <button
          class="px-3 py-1 border text-gray-500 bg-white"
          @click="
            () =>
              pageNumber < pages.length &&
              feedbackStore.setPageNumber(pageNumber + 1)
          "
        >
          &gt;
        </button>
      </div>
    </div>
  </template>
  <template v-else>
    <div class="flex justify-between items-center">LOADING...</div>
  </template>
</template>
<script setup lang="ts">
import FeedbackListItem from './FeedbackListItem.vue';

import { useQuery } from '@tanstack/vue-query';
import FeedbackProvider from '../providers/FeedbackProvider.ts';
import { computed, ref, watch } from 'vue';
import { useFeedbackStore } from '../stores/FeedbackStore.ts';
import _ from 'lodash';
import { storeToRefs } from 'pinia';

const feedbackStore = useFeedbackStore();
const { filterByReporter, sortByDate, pageNumber } = storeToRefs(feedbackStore);

const perPage = ref(5);

const { data: filteredFeedbacks } = useQuery({
  queryKey: ['feedback', filterByReporter, sortByDate, pageNumber, perPage],
  queryFn: () => {
    return FeedbackProvider.getAllFeedbacks({
      filterByReporter: filterByReporter?.value,
      sortByDate: sortByDate?.value,
      pageNumber: pageNumber?.value,
      perPage: perPage.value,
    });
  },
});

const { data: allFeedbacks } = useQuery({
  queryKey: ['feedback'],
  queryFn: () => {
    return FeedbackProvider.getAllFeedbacks();
  },
});

const reporters = computed(() => {
  if (Array.isArray(allFeedbacks.value?.data)) {
    return _.uniq(allFeedbacks.value.data.map((feedback) => feedback.name));
  } else {
    return [];
  }
});

const pages = computed(() => {
  if (filteredFeedbacks.value?.totalCount) {
    const totalPages = Math.ceil(
      filteredFeedbacks.value.totalCount / perPage.value,
    ); // Calculate total pages needed
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  } else {
    return [];
  }
});

watch(filteredFeedbacks, () => {
  if (
    Array.isArray(filteredFeedbacks.value?.data) &&
    filteredFeedbacks.value?.data.length > 0
  ) {
    feedbackStore.setSelectedFeedbackId(filteredFeedbacks.value?.data[0].id);
  }
});
</script>
