import axios from "axios";

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
  const res = await axios.post(`/api/chat`, formData);
  console.log("결과 데이터:", res.data);
  return res.data;
};
