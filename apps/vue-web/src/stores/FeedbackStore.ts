// src/stores/feedbackStore.ts
import { defineStore } from 'pinia';

type FeedbackState = {
  selectedFeedbackId: string | undefined;
  filterByReporter?: string;
  sortByDate?: 'ASC' | 'DESC';
  pageNumber: number;
};

export const useFeedbackStore = defineStore('feedback', {
  state: (): FeedbackState => ({
    selectedFeedbackId: undefined,
    filterByReporter: undefined,
    sortByDate: undefined,
    pageNumber: 1,
  }),

  actions: {
    setSelectedFeedbackId(feedbackId: string) {
      this.selectedFeedbackId = feedbackId;
    },
    setFilterByReporter(reporter: string | undefined) {
      if (reporter) {
        this.filterByReporter = reporter;
      } else {
        this.filterByReporter = undefined;
      }
      this.pageNumber = 1;
    },
    setSortByDate(sort: 'ASC' | 'DESC' | undefined) {
      this.sortByDate = sort;
    },
    setPageNumber(pageNumber: number) {
      this.pageNumber = pageNumber;
    },
  },
});
