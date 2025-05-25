import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const postResult = async ({ age, vision, tags, images }) => {
  const formData = new FormData();
  formData.append("age", age);
  formData.append("vision", vision);
  formData.append("tags", JSON.stringify(tags));
  images.forEach((image) => formData.append("images", image));

  const res = await axios.post(`${API_URL}/api/chat`, formData);
  return res.data;
};