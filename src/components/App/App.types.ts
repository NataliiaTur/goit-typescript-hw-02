export type ImageItem = {
  id: string;
  alt: string;
  urlSm: string;
  urlReg: string;
  likes: number;
};

export type UnsplashImage = {
  id: string;
  alt_description: string;
  urls: {
    small: string;
    regular: string;
  };
  likes: number;
};

export type UnsplashResponse = {
  results: UnsplashImage[];
  total_pages: number;
};
