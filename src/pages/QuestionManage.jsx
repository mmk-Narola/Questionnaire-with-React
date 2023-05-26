import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { quesDeleted } from "../features/quesCrud";

const QuestionManage = () => {
  const questionObj = JSON.parse(localStorage.getItem("questions"));
  const [questionList, setQuestionList] = useState([]);

  const navigate = useNavigate();

  const questionDeleted = (id) => {
    const filterList = questionObj.filter((quest) => quest.id !== id);
    setQuestionList(filterList);
    localStorage.setItem("questions", JSON.stringify(filterList));
  };

  useEffect(() => {
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
                            <Link to={`/update-question/${question.id}`}>
                              <button className="btn btn-sm btn-outline-success">
                                Edit
                              </button>
                            </Link>

                            <button
                              className="btn btn-sm btn-danger"
                              data-bs-target="#staticBackdrop"
                              onClick={() => questionDeleted(question.id)}
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
