import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const postResult = async ({ age, vision, tags, images }) => {
  const formData = new FormData();
  formData.append("age", age);
  formData.append("vision", vision);
  tags.forEach((tag) => {
    formData.append("tags", JSON.stringify([tag]));
  });
  images.forEach((image) => formData.append("images", image));
  // FormData 내용 확인
  // for (let pair of formData.entries()) {
  //   console.log(pair[0], pair[1]);
  // }
  const res = await axios.post(`${API_URL}/api/chat`, formData);
  console.log("결과 데이터:", res.data);
  return res.data;
};
