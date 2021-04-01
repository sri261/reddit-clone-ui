export interface PostI {
  id: number;
  user_id: number;
  subreddit_id: number;
  post_title: string;
  post_description: string;
  timestamp: string;
  update_timestamp: string;
  upvotes: number;
  downvotes: number;
  comments_count: number;
}
