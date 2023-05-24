import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { DATA_CONSTANTS } from "../contants/qestionType";

const initialState = {
  question: "",
  options: [],
  answer: [],
  type: "",
  date: new Date().toJSON(),
  id: uuidv4(),
  answered: false,
  ansDate: "",
};

const CreateQuestion = () => {
  const types = DATA_CONSTANTS.OPTION_TYPE;
  const [question, setQuestion] = useState({
    questionTxt: "",
    questionType: "",
  });
  const [showOpt, setShowOpt] = useState(false);

  const handleQuestion = (e) => {
    setQuestion({ ...question, questionTxt: e.target.value });
  };

  const handleOption = (e) => {
    setQuestion({ ...question, questionType: e.target.value });
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

  return (
    <div className="container page-content">
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
                Question Type<span className="text-danger">*</span>
              </label>
              <div className="d-flex gap-4"> {OptionTypes}</div>
              {showOpt && (
                <label htmlFor="" className="mb-3">
                  Option<span className="text-danger">*</span>
                </label>
              )}
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
