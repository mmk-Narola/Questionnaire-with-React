import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const AddEditQuestion = (props) => {
  const option = props.questionWithType;

  const [sQ, setSQ] = useState({
    question: option.questionTxt,
    options: [],
    answer: [],
    type: option.questionType,
    date: new Date().toJSON(),
    id: uuidv4(),
    answered: false,
    ansDate: "",
  });
  const [inputField, setInputField] = useState([
    {
      optionValue: "",
    },
  ]);
  const [openQues, setOpenQues] = useState(true);

  const addOption = () => {
    setInputField([
      ...inputField,
      {
        optionValue: "",
      },
    ]);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputField];
    values.splice(index, 1);
    setInputField(values);
  };

  const handleInputChange = (index, e) => {
    const values = [...inputField];
    values[index].optionValue = e.target.value;
    setInputField(values);

    setSQ((prev) => ({ ...prev, options: [...values] }));
  };

  const handleAns = (e) => {
    console.log(option.questionType);
    if (
      e.target.checked === true &&
      sQ.answer.length === 0 &&
      option.questionType === "1"
    ) {
      setSQ((prev) => ({
        ...prev,
        answer: [...prev.answer, e.target.value],
      }));
    } else if (e.target.checked === true && option.questionType === "2") {
      setSQ((prev) => ({
        ...prev,
        answer: [...prev.answer, e.target.value],
      }));
    } else if (e.target.checked === false) {
      setSQ((prev) => ({
        ...prev,
        answer: prev.answer.filter((val) => val !== e.target.value),
      }));
    }
  };

  const handleSubmit = () => {
    console.log(inputField);
    console.log(sQ);
  };

  useEffect(() => {
    if (option.questionType === "3") {
      setOpenQues(false);
    } else {
      setOpenQues(true);
    }
    setSQ((prev) => ({
      ...prev,
      answer: [],
    }));
  }, [option]);

  return (
    <>
      {openQues && (
        <div className="row mt-3 align-items-center">
          <div>
            <label htmlFor="" className="mb-3">
              Option<span className="text-danger">*</span>
            </label>
            <button
              className="btn btn-primary btn-sm mx-2"
              type="button"
              onClick={addOption}
            >
              +
            </button>
            (Click checkbox for correct answer)
          </div>

          {/* <div className="col-md-4 d-flex gap-2">
            <input
              className="form-check-input mt-3"
              type="checkbox"
              name="ans"
              id=""
            />
            <input
              type="text"
              className="form-control"
              placeholder="Type option"
            />
          </div>

          <div className="col-md-4">
            <div className="d-flex gap-2 align-items-center">
              <button className="btn btn-danger btn-sm">-</button>
            </div>
          </div> */}

          {inputField.map((input, index) => (
            <div key={index} className="d-flex gap-2">
              <div className="col-md-4 d-flex gap-2">
                <input
                  className="form-check-input mt-3"
                  type="checkbox"
                  name="ans"
                  checked={sQ.answer.includes(input.optionValue)}
                  value={input.optionValue}
                  onChange={(e) => handleAns(e)}
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Type option"
                  name="options"
                  value={inputField.optionValue}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </div>
              <div className="col-md-4">
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleRemoveFields(index)}
                >
                  -
                </button>
              </div>
            </div>
          ))}

          <div className="col-12 mt-3 md-3">
            <div className="devider"></div>
          </div>
        </div>
      )}
      <div className="col-12 mt-4">
        <div className="d-flex gap-2 align-items-center">
          <button
            className="btn btn-primary px-4"
            type="submit"
            onClick={handleSubmit}
          >
            ADD
          </button>
          <button className="btn btn-danger px-4" type="button">
            CANCEL
          </button>
        </div>
      </div>
    </>
  );
};

export default AddEditQuestion;
