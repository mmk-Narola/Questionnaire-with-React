import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const QuestionManage = () => {
  const [questionList, setQuestionList] = useState([]);

  useEffect(() => {
    const questionObj = JSON.parse(localStorage.getItem("questions"));
    setQuestionList(questionObj);
  }, []);

  return (
    <div className="page-content">
      <div className="container">
        <div className="row">
          <div className="main-title">
            <div className="d-flex justify-content-between">
              <h2>Question Management</h2>
              <button className="btn btn-link">
                <Link to="/create-question"> ADD QUESTION</Link>
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead className="thead-light">
                  <tr className="text-center">
                    <th className="text-center">#</th>
                    <th>Question</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                {questionList && questionList.length > 0 ? (
                  questionList.map((question, index) => (
                    <tbody key={question.id}>
                      <tr>
                        <th className="text-center">{index + 1}</th>
                        <td>{question.question}</td>
                        <td>{question.type}</td>
                        <td>{new Date(question.date).toLocaleDateString()}</td>
                        <td>
                          <div className="d-flex gap-2">
                            <button className="btn btn-sm btn-outline-success">
                              Edit
                            </button>
                            <button
                              className="btn btn-sm btn-danger"
                              data-bs-toggle="modal"
                              data-bs-target="#staticBackdrop"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  ))
                ) : (
                  <tbody>
                    <tr>
                      <td className="text-center" colSpan={5}>
                        No Question
                      </td>
                    </tr>
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionManage;

{
  /* <h2>No Questions</h2>
      <Link to="/create-question">
        <button className="btn btn-primary px-4" type="button">
          ADD Question
        </button>
      </Link> */
}
