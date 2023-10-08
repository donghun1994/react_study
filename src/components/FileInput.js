import { useRef, useState } from "react";

// fileinput은 무조건 비제어 컴포넌트로 만들어야한다.

function FileInput({ name, value, onChange }) {
  const inputRef = useRef();

  const handleChange = (e) => {
    const nextValue = e.target.files[0];
    onChange(name, nextValue);
  };

  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;

    inputNode.value = ""; // 브라우저 내에서 선택된 파일이 없도록 빈 문자로 바꿈.
    onChange(name, null);
  };
  return (
    <div>
      <input type="file" onChange={handleChange} ref={inputRef} />
      {value && <button onClick={handleClearClick}>X</button>}
    </div>
  );
}

export default FileInput;
