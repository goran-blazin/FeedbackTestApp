// src/stores/feedbackStore.ts
import { defineStore } from 'pinia';

type FeedbackState = {
  selectedFeedbackId: string | undefined;
  filterByReporter?: string;
  sortByDate?: 'ASC' | 'DESC';
};

export const useFeedbackStore = defineStore('feedback', {
  state: (): FeedbackState => ({
    selectedFeedbackId: undefined,
    filterByReporter: undefined,
    sortByDate: undefined,
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
    },
    setSortByDate(sort: 'ASC' | 'DESC' | undefined) {
      this.sortByDate = sort;
    },
    // addFeedback(feedback: Feedback) {
    //     this.feedbackList.push(feedback)
    // },
    // setFeedbackList(feedbacks: Feedback[]) {
    //     this.feedbackList = feedbacks
    // }
  },
});
