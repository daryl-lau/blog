import { api } from "./api";

export interface ArticleProps {
  id: string;
  markdown: string;
  toc: string;
  title: string;
  abstract: string;
  category: string;
  cover: string;
}

export const getCategory = (
  category: string,
  currentPage: number,
  pageSize: number
) => api.get(`/api/category/${category}/${currentPage}/${pageSize}`);
export const getArticleById = (id: string) => api.get(`/api/article/${id}`);
export const saveArticle = (article: ArticleProps) =>
  api.post("/api/save", article);
export const deleteArticleById = (id: string) => api.delete(`/api/delete/${id}`);
export const saveCategory = (params: { data: string }) =>
  api.post("/api/saveCategory", params);
export const queryCategory = () => api.get("/api/getCategory");
export const queryCovers = () => api.get("/api/getCovers");
export const deleteCover = (id: string) => api.delete(`/api/deleteCover/${id}`);
export const searchArticle = (params: { keyword: string }) =>
  api.post("/api/search", params);
