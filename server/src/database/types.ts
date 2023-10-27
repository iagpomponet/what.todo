export interface User {
  user_id: string;
  first_name: string;
  last_name: string;
  password: string;
  avatar_url: string;
}

export interface Todo {
  todo_id: string;
  user_id: string;
  label: string;
  completed: boolean;
  content: string;
}

export interface Label {
  post_id: string;
  user_id: string;
  value: string;
  color: string;
}
