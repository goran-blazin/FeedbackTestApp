import { Feedback } from '../types.ts';

const rootUrl = 'http://localhost:3000';

const FeedbackProvider = {
  async getAllFeedbacks() {
    const res = await fetch(`${rootUrl}/api/feedback`);
    const jsonData = await res.json();
    return jsonData as Feedback[];
  },

  async getSingleFeedback(id: string) {
    const res = await fetch(`${rootUrl}/api/feedback/${id}`);
    const jsonData = await res.json();
    return jsonData as Feedback[];
  },

  async createFeedback(feedback: Feedback) {
    const res = await fetch(`${rootUrl}/api/feedback`, {
      method: 'POST',
      body: JSON.stringify(feedback),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.ok;
  },

  async deleteFeedback(id: string) {
    const res = await fetch(`${rootUrl}/api/feedback/${id}`, {
      method: 'DELETE',
    });
    return res.ok;
  },
};

export default FeedbackProvider;
