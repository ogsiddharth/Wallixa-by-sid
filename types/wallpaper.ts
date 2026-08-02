export interface Wallpaper {
  id: number;
  slug: string;
  title: string;
  image: string;
  category: string;
  resolution: string;
  downloads: number;
  likes: number;
  tags: string[];
}