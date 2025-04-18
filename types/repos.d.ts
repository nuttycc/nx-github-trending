interface TrendingReposData {
  date: string;
  repositories: Repository[];
}

interface Repository {
  name: string;
  tree: string;
  tree_size: string;
  new_star_count: string;
  twitter_username: null;
  id: number;
  node_id: string;
  full_name: string;
  private: boolean;
  owner: Owner;
  description: string;
  fork: boolean;
  url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  homepage: string;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  has_issues: boolean;
  has_projects: boolean;
  has_downloads: boolean;
  // has_wiki: boolean;
  // has_pages: boolean;
  // has_discussions: boolean;
  // forks_count: number;
  // archived: boolean;
  // disabled: boolean;
  // open_issues_count: number;
  // license: License;
  // allow_forking: boolean;
  // is_template: boolean;
  // web_commit_signoff_required: boolean;
  // topics: Topics;
  // visibility: string;
  forks: number;
  open_issues: number;
  watchers: number;
  // default_branch: string;
  // permissions: Permissions;
  // temp_clone_token: string;
  // custom_properties: Topics;
  organization: Owner;
  network_count: number;
  subscribers_count: number;
  readme: string;
}

interface Permissions {
  admin: boolean;
  maintain: boolean;
  push: boolean;
  triage: boolean;
  pull: boolean;
}


// interface Topics {
  
// }

interface License {
  key: string;
  name: string;
  spdx_id: string;
  url: string;
  node_id: string;
}

interface Owner {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  type: string;
  user_view_type: string;
  site_admin: boolean;
}