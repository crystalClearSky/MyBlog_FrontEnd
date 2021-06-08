export default interface ICreateContent {
  id?: number;
  title: string;
  description: string;
  content?: string;
  images?: Image[];
  tags?: Tag[];
  postType?: number;
}
export interface Image {
  imageUrl: string;
  quickDescription: string;
  thumbnailUrl?: string;
}
export interface Tag {
  tagItem: string;
}
