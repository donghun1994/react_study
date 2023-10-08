import { useState } from "react";
import "./ReviewForm.css";
import FileInput from "./FileInput";

function ReviewForm() {
  const [values, setValues] = useState({
    title: "",
    rating: 0,
    content: "",
    imgFile: null,
  });

  //input 태그의 name 값을 이용해서 state 및 change 함수를 하나로 관리!

  const handleChange = (name, value) => {
    setValues((preValues) => ({
      ...preValues,
      [name]: value,
    }));
  };

  // fileinput은 이벤트 객체의 value를 사용하는 것이 아닌 files로 관리하기 때문에
  // fileinput.js 에서 flies로 받아와서 value로 넣기 위해 fileinput과 input을 나눠서 관리
  const hanleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    // react 에서는 html과 다르게 input event처럼 동작함(변화할때마다 이벤트 발생함)
    // onSubmit은 submit 하게 되면 getrequest도 같이 날아감(브라우저 기본동작으로 페이지를 새로고침함)
    // 그래서 handleSubmit에서 이벤트 객체의 기본동작을 제어해줘야함
    <form className="ReviewForm" onSubmit={handleSubmit}>
      <FileInput
        name="imgFile"
        value={values.imgFile}
        onChange={handleChange}
      />
      <input
        name="title"
        value={values.title}
        onChange={hanleInputChange}
      ></input>
      <input
        type="number"
        name="rating"
        value={values.rating}
        onChange={hanleInputChange}
      ></input>
      <textarea
        name="content"
        value={values.content}
        onChange={hanleInputChange}
      ></textarea>
      <button type="submit">확인</button>
    </form>
  );
}

export default ReviewForm;
