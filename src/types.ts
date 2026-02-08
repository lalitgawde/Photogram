export interface Post {
  caption: string;
  photos: PhotoMeta[];
  likes: number;
  userlikes: [];
  userId: string | null;
  date: Date;
}

export interface PhotoMeta {
  cdnUrl: string | null;
  uuid: string | null;
}

export interface DocumentResponse {
  id: string;
  caption: string;
  photos: PhotoMeta[];
  likes: number;
  userlikes: [];
  userId: string | null;
  date: Date;
}
