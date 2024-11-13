// src/stores/feedbackStore.ts
import { defineStore } from 'pinia';

type FeedbackState = {
  selectedFeedbackId: string | undefined;
};

export const useFeedbackStore = defineStore('feedback', {
  state: (): FeedbackState => ({
    selectedFeedbackId: undefined,
  }),

  // getters: {
  //   selectedFeedbackId: (state) => state.selectedFeedbackId,
  // },

  actions: {
    setSelectedFeedbackId(feedbackId: string) {
      this.selectedFeedbackId = feedbackId;
    },
    // addFeedback(feedback: Feedback) {
    //     this.feedbackList.push(feedback)
    // },
    // setFeedbackList(feedbacks: Feedback[]) {
    //     this.feedbackList = feedbacks
    // }
  },
});
