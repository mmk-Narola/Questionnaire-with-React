import React, { useEffect, useState } from "react";

const intialUserAns = {
  type: "",
  ans: "",
};

const ListQuestion = () => {
  const questionObj = JSON.parse(localStorage.getItem("questions"));

  const [localData, setLocalData] = useState(questionObj || []);
  const [answerObj, setAnswerObj] = useState([]);
  const [unanswerObj, setUnanswerObj] = useState([]);
  const [userAns, setUserAns] = useState("");

  const setAnsValue = (data) => {
    data?.sort(function (a, b) {
      let dateA = new Date(a.date).getTime();
      let dateB = new Date(b.date).getTime();
      return dateA < dateB ? 1 : -1; // ? -1 : 1 for ascending/increasing order
    });
    const ansTrue = data?.filter((ele) => ele.answered === true);
    const ansFalse = data?.filter((ele) => ele.answered === false);
    setAnswerObj(ansTrue);
    setUnanswerObj(ansFalse);
    localStorage.setItem("questions", JSON.stringify(data));
  };

  const userAnsValue = (submitType, ans, id) => {
    localData.forEach((ele) => {
      ele.id == id
        ? ((ele.ansDate = new Date().toJSON()),
          (ele.answered = submitType),
          (ele.userAns = ans))
        : "No Data";
    });
  };

  const onSubmitAns = (submitType, questionId) => {
    submitType === true
      ? userAnsValue(submitType, userAns, questionId)
      : userAnsValue(submitType, null, questionId);
    console.log(localData);
    setAnsValue(localData);
  };

  useEffect(() => {
    // localData?.sort(function (a, b) {
    //   let dateA = new Date(a.date).getTime();
    //   let dateB = new Date(b.date).getTime();
    //   return dateA < dateB ? 1 : -1; // ? -1 : 1 for ascending/increasing order
    // });
    setAnsValue(localData);
  }, [localData]);

  return (
    <div className="page-content">
      <div className="container">
        <div className="row">
          {/*   <!-- unanswered --> */}
          <div className="col-lg-6">
            <div className="row">
              <div className="col-12">
                <div className="main-title">
                  <h2 className="text-center">Unanswered List</h2>
                </div>
              </div>

              <div className="col-lg-12">
                {unanswerObj.map((ele) => (
                  <div className="card mb-2">
                    <div className="card-body">
                      <div className="mb-2">
                        <h6 className="mb-1">Question : {ele.question}</h6>
                      </div>
                      <div className="mb-2 option-box">
                        <div className="form-check">
                          {ele.type === "1" ? (
                            <>
                              {ele.options.map((opt) => (
                                <>
                                  <label className="form-check-label d-flex gap-2">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      name="answers"
                                      id={ele.id}
                                      value={opt.optionValue}
                                      onChange={(e) =>
                                        setUserAns(e.target.value)
                                      }
                                    />
                                    {opt.optionValue}
                                  </label>
                                </>
                              ))}
                            </>
                          ) : (
                            <>
                              {ele.type === "2" ? (
                                <>
                                  {ele.options.map((opt) => (
                                    <>
                                      <label className="form-check-label d-flex gap-2">
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          name="answers"
                                          id={ele.id}
                                          value={ele.type}
                                          onChange={(e) => handleOption(e)}
                                        />
                                        {opt.optionValue}
                                      </label>
                                    </>
                                  ))}
                                </>
                              ) : (
                                <>
                                  {ele.type === "3" ? (
                                    <>
                                      <div className="mt-1 mb-1">
                                        <input
                                          type="text"
                                          className="form-control"
                                          name="ansTxt"
                                          value={userAns}
                                          onChange={(e) =>
                                            setUserAns(e.target.value)
                                          }
                                        />
                                      </div>
                                    </>
                                  ) : null}
                                </>
                              )}
                            </>
                          )}
                        </div>
                      </div>

                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-sm btn-success"
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop"
                          onClick={() => onSubmitAns(true, ele.id)}
                        >
                          SAVE
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/*    <!-- answered --> */}
          <div className="col-lg-6">
            <div className="row">
              <div className="col-12">
                <div className="main-title">
                  <h2 className="text-center">Answered List</h2>
                </div>
              </div>
              <div className="col-lg-12">
                {answerObj.map((ele) => (
                  <div className="card mb-2">
                    <div className="card-body">
                      <div className="mb-2">
                        <h6 className="mb-1">Question : {ele.question}</h6>
                      </div>

                      <div className="mb-2 option-box">
                        <div className="form-check">
                          {ele.type === "1" ? (
                            <>
                              <div className="mt-1 mb-1">
                                <h4>{ele.userAns}</h4>
                              </div>
                              {ele.answer.map((opt) =>
                                opt === userAns ? "Right" : "Wrong"
                              )}
                            </>
                          ) : (
                            <>
                              {ele.type === "2" ? (
                                <>
                                  {ele.options.map((opt) => (
                                    <>
                                      <label className="form-check-label d-flex gap-2">
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          name="answers"
                                          id="{{ ans.id }}"
                                          value="{{ ans.id }}"
                                        />
                                        {opt.optionValue}
                                      </label>
                                    </>
                                  ))}
                                </>
                              ) : (
                                <>
                                  {ele.type === "3" ? (
                                    <>
                                      <div className="mt-1 mb-1">
                                        <h4>{ele.userAns}</h4>
                                      </div>
                                    </>
                                  ) : null}
                                </>
                              )}
                            </>
                          )}
                        </div>
                      </div>

                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-sm btn-danger"
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop"
                          onClick={() => onSubmitAns(false, ele.id)}
                        >
                          Back
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListQuestion;

// submitType === true
//   ? localData.forEach((ele) => {
//       ele.type == type
//         ? ((ele.ansDate = new Date().toJSON()),
//           (ele.answered = submitType),
//           (ele.userAns = [userAns.ans]))
//         : "No Data";
//     })
//   : localData.forEach((ele) => {
//       ele.type == type
//         ? ((ele.ansDate = new Date().toJSON()),
//           (ele.answered = submitType),
//           (ele.userAns = []))
//         : "No Data";
//     });

// const onBackSubmit = (type) => {
//   localData.forEach((ele) => {
//     ele.type == type
//       ? ((ele.ansDate = new Date().toJSON()), (ele.answered = false))
//       : "No Data";
//   });
//   setAnsValue(localData);
// };

// const handleUserAns = (e,type) => {
//   console.log("Option", e.target.value);
//   localData.forEach((ele)=>{

//   })

// };

// const handleQuestion = (e) => {
//   setOpenAns(e.target.value);
// };

// const handleOption = (e) => {
//   console.log("Option", e.target.value);
//   setCorrectRadio(e.target.value);
// };
// const ansTrue = localData?.filter((ele) => ele.answered === true);
// const ansFalse = localData?.filter((ele) => ele.answered === false);
// if (ansFalse && ansTrue) {
//   setUnanswerObj(ansFalse);
//   setAnswerObj(ansTrue);
// }
