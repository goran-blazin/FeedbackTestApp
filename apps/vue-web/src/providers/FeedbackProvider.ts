import { Feedback } from '../types.ts';

const rootUrl = 'http://localhost:3000';

const FeedbackProvider = {
  async getAllFeedbacks({
    filterByReporter,
    sortByDate,
    pageNumber,
    perPage,
  }: {
    filterByReporter?: string;
    sortByDate?: 'ASC' | 'DESC';
    pageNumber?: number;
    perPage?: number;
  } = {}): Promise<{
    data: Feedback[];
    totalCount: 1;
  }> {
    const queryParams = new URLSearchParams();
    if (filterByReporter)
      queryParams.append('filterByReporter', filterByReporter);
    if (sortByDate) queryParams.append('sortByDate', sortByDate);
    if (pageNumber) queryParams.append('pageNumber', pageNumber.toString());
    if (perPage) queryParams.append('perPage', perPage.toString());

    const res = await fetch(
      `${rootUrl}/api/feedback${queryParams.toString() ? '?' + queryParams.toString() : ''}`,
    );
    const jsonData = await res.json();
    return jsonData;
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
    return res.ok || res.json();
  },

  async deleteFeedback(id: string) {
    const res = await fetch(`${rootUrl}/api/feedback/${id}`, {
      method: 'DELETE',
    });
    return res.ok;
  },
};

export default FeedbackProvider;
