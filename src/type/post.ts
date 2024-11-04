export interface Post {
  id: number;
  title: string;
  description: string;
  emoji: string;
  slug: string;
  content: string;
  tags: string[];
  coverImageUrl: string;
  isPublished: boolean;
  createdPlace: string;
  createdAt: string;
  updatedAt: string;
}
