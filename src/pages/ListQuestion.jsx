import React, { useEffect, useState } from "react";

const ListQuestion = () => {
  const questionObj = JSON.parse(localStorage.getItem("questions"));

  const [localData, setLocalData] = useState(questionObj || []);
  const [answerObj, setAnswerObj] = useState([]);
  const [unanswerObj, setUnanswerObj] = useState([]);
  const [openAns, setOpenAns] = useState("");
  const [correctRadio, setCorrectRadio] = useState("");
  const [correctCheckOpt, setCorrectCheckOpt] = useState([]);

  const handleQuestion = (e) => {
    console.log(e.target.value);
    setOpenAns(e.target.value);
  };

  const handleOption = (e) => {
    console.log("Option", e.target.value);
    setCorrectRadio(e.target.value);
  };

  const setAnsValue = (data) => {
    localStorage.setItem("questions", JSON.stringify(data));
    const ansTrue = data?.filter((ele) => ele.answered === true);
    const ansFalse = data?.filter((ele) => ele.answered === false);
    setAnswerObj(ansTrue);
    setUnanswerObj(ansFalse);
  };

  const onSubmitAns = (type) => {
    localData.forEach((ele) => {
      ele.type == type
        ? ((ele.ansDate = new Date().toJSON()), (ele.answered = true))
        : "No Data";
    });
    setAnsValue(localData);
  };

  const onBackSubmit = (type) => {
    localData.forEach((ele) => {
      ele.type == type
        ? ((ele.ansDate = new Date().toJSON()), (ele.answered = false))
        : "No Data";
    });

    setAnsValue(localData);
  };

  useEffect(() => {
    localData?.sort(function (a, b) {
      let dateA = new Date(a.date).getTime();
      let dateB = new Date(b.date).getTime();
      return dateA < dateB ? 1 : -1; // ? -1 : 1 for ascending/increasing order
    });

    const ansTrue = localData?.filter((ele) => ele.answered === true);
    const ansFalse = localData?.filter((ele) => ele.answered === false);
    if (ansFalse && ansTrue) {
      setUnanswerObj(ansFalse);
      setAnswerObj(ansTrue);
    }
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
                                      onChange={(e) => handleOption(e)}
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
                                        <input
                                          type="text"
                                          className="form-control"
                                          name="ansTxt"
                                          value={openAns}
                                          onChange={handleQuestion}
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
                          onClick={() => onSubmitAns(ele.type)}
                          disabled={ele.answered.length === 0}
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
                              {ele.options.map((opt) => (
                                <>
                                  <label className="form-check-label d-flex gap-2">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      name="answers"
                                      id={ele.id}
                                      value={opt.optionValue}
                                      onChange={(e) => handleOption(e)}
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
                                        <h4>Text Ans</h4>
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
                          onClick={() => onBackSubmit(ele.type)}
                          disabled={ele.answered.length === 0}
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
