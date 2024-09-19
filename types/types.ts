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
  events_url: string;
};

export type Comment = {
  id: number;
  created_at: string;
  user: User;

  body: string;
};

export type Event = {
  id: number;
  created_at: string;
  actor: User;

  event: string;
};

export type IssueUser = {
  login: Comment["user"]["login"];
  commentsCount: number;
};
