export type User = {
  login: string;
  avatar_url: string;
};

export type Issue = {
  id: number;
  created_at: string;
  user: User;

  number: number;
  title: string;
  body: string;
  comments_url: string;
};

export type Comment = {
  id: number;
  created_at: string;
  user: User;

  body: string;
};

export type IssueUser = {
  user: User;
  commentsCount: number;
};
