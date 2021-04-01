export interface Comment {
  id: number;
  user_id: number;
  post_id: number;
  comment_id: number;
  comments: string;
  timestamp: string;
  update_timestamp: string;
  upvotes: number;
  downvotes: number;
}
