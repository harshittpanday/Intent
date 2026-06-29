export type SourceType = "reddit" | "youtube";

export type Source = {
  id: string;
  type: SourceType;
  title: string;
  url: string;
};

export type Post = {
  id: string;
  topic: string;
  summary: string;
  sources: Source[];
};