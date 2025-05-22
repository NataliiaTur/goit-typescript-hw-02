import axios from "axios";
import { UnsplashResponse } from "../App/App.types";

const API_KEY = "b6hhaOxVnsmPR2OX2f5fwWiBCD_VsvAhBXPMiYaGPoI";
axios.defaults.baseURL = "https://api.unsplash.com/";
axios.defaults.headers.common["Authorization"] = `Client-ID ${API_KEY}`;
axios.defaults.params = {
  orientation: "landscape",
  per_page: 12,
};

export const getImages = async (
  query: string,
  page: number
): Promise<UnsplashResponse> => {
  const { data } = await axios.get<UnsplashResponse>(
    `search/photos?query=${query}&page=${page}`
  );
  return data;
};
