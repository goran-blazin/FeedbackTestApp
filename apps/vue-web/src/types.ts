export type Feedback = {
  id: string;
  name: string;
  email: string;
  feedbackType: 'BUG' | 'SUGGESTION';
  title: string;
  message: string;
  createdAt: string;
};
