import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { DATA_CONSTANTS } from "../contants/qestionType";
import { useNavigate } from "react-router-dom";

const initialState = {
  question: "",
  options: [],
  answer: [],
  type: "",
  date: new Date().toJSON(),
  id: "",
  answered: false,
  ansDate: "",
};

const CreateQuestion = () => {
  let id = uuidv4();
  const types = DATA_CONSTANTS.OPTION_TYPE;

  const [question, setQuestion] = useState({
    questionTxt: "",
    questionType: "",
  });
  const [sQ, setSQ] = useState(initialState);
  const [showOpt, setShowOpt] = useState(false);
  const [inputField, setInputField] = useState([
    {
      optionValue: "",
    },
  ]);
  const [openQues, setOpenQues] = useState(true);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

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
    if (
      e.target.checked === true &&
      sQ.answer.length === 0 &&
      question.questionType === "1"
    ) {
      setSQ((prev) => ({
        ...prev,
        answer: [...prev.answer, e.target.value],
      }));
    } else if (e.target.checked === true && question.questionType === "2") {
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

  const handleQuestion = (e) => {
    setQuestion({ ...question, questionTxt: e.target.value });
    setError(false);
  };

  const handleOption = (e) => {
    setQuestion({ ...question, questionType: e.target.value });

    setSQ((prev) => ({
      ...prev,
      type: e.target.value,
      question: question.questionTxt,
      id: id,
    }));
    setShowOpt(true);
  };

  const OptionTypes = types.map((option) => {
    return (
      <div key={option.id}>
        <input
          className="form-check-input"
          type="radio"
          id={option.id}
          name="questionType"
          value={option.id}
          onChange={(e) => handleOption(e)}
        />
        <label className="form-check-label ms-2">{option.value}</label>
      </div>
    );
  });

  const handleSubmit = () => {
    if (sQ.question) {
      console.log(sQ);
      navigate("/");
      const localData = localStorage.getItem("questions")
        ? JSON.parse(localStorage.getItem("questions"))
        : [];
      localData.push(sQ);
      localStorage.setItem("questions", JSON.stringify(localData));
    } else {
      setError(true);
    }
    // setSQ(initialState);
  };

  useEffect(() => {
    if (question.questionType === "3") {
      setOpenQues(false);
    } else {
      setOpenQues(true);
    }
    setSQ((prev) => ({
      ...prev,
      answer: [],
    }));
  }, [question]);

  return (
    <div className="container page-content">
      {error && (
        <div
          className="alert alert-danger  alert-dismissible fade show"
          role="alert"
        >
          Please Enter Question
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            aria-autocomplete="false"
          ></button>
        </div>
      )}

      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="main-title">
              <h2>Add Questions</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-8">
            <div className="mb-3">
              <label className="form-label mt-4">
                Enter Question <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="question"
                name="question"
                value={question.questionTxt}
                onChange={handleQuestion}
              />
            </div>
          </div>
          <div className="col-12">
            <div className="mb-3">
              <label className="form-label">
                Options Type<span className="text-danger">*</span>
              </label>
              <div className="d-flex gap-4"> {OptionTypes}</div>
              {showOpt && openQues && (
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateQuestion;

// import React, { useState } from "react";
// import { DATA_CONSTANTS } from "../contants/qestionType";
// import AddEditQuestion from "../components/addEditQuestion";

// const CreateQuestion = () => {
//   const types = DATA_CONSTANTS.OPTION_TYPE;
//   const [question, setQuestion] = useState({
//     questionTxt: "",
//     questionType: "",
//   });
//   const [showOpt, setShowOpt] = useState(false);

//   const handleQuestion = (e) => {
//     setQuestion({ ...question, questionTxt: e.target.value });
//   };

//   const handleOption = (e) => {
//     setQuestion({ ...question, questionType: e.target.value });
//     setShowOpt(true);
//   };

//   const OptionTypes = types.map((option) => {
//     return (
//       <div key={option.id}>
//         <input
//           className="form-check-input"
//           type="radio"
//           id={option.id}
//           name="questionType"
//           value={option.id}
//           onChange={(e) => handleOption(e)}
//         />
//         <label className="form-check-label ms-2">{option.value}</label>
//       </div>
//     );
//   });
//   return (
//     <div className="container page-content">
//       <div className="container">
//         <div className="row">
//           <div className="col-12">
//             <div className="main-title">
//               <h2>Add Questions</h2>
//             </div>
//           </div>
//         </div>
//         <div className="row">
//           <div className="col-8">
//             <div className="mb-3">
//               <label className="form-label mt-4">
//                 Enter Question <span className="text-danger">*</span>
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="question"
//                 name="question"
//                 value={question.questionTxt}
//                 onChange={handleQuestion}
//               />
//             </div>
//           </div>
//           <div className="col-12">
//             <div className="mb-3">
//               <label className="form-label">
//                 Question Type<span className="text-danger">*</span>
//               </label>
//               <div className="d-flex gap-4"> {OptionTypes}</div>
//               {showOpt && <AddEditQuestion questionWithType={question} />}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateQuestion;
