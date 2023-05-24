import React from "react";
import { Link } from "react-router-dom";

const QuestionManage = () => {
  return (
    <div className="container page-content d-flex gap-2">
      <h2>No Questions</h2>
      <Link to="/create-question">
        <button className="btn btn-primary px-4" type="button">
          ADD Question
        </button>
      </Link>
    </div>
  );
};

export default QuestionManage;
