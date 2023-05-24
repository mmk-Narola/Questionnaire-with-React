import React, { useState } from "react";

function Demo() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswers, setCorrectAnswers] = useState([]);

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleOptionChange = (index, event) => {
    const updatedOptions = [...options];
    updatedOptions[index] = event.target.value;
    setOptions(updatedOptions);
  };

  const handleCheckboxChange = (event, index) => {
    const selectedValue = event.target.value;
    const isChecked = event.target.checked;
    if (isChecked) {
      setCorrectAnswers((prevAnswers) => [...prevAnswers, selectedValue]);
    } else {
      setCorrectAnswers((prevAnswers) =>
        prevAnswers.filter((answer) => answer !== selectedValue)
      );
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the question, options, and correct answers
    console.log("Question:", question);
    console.log("Options:", options);
    console.log("Correct Answers:", correctAnswers);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="question">Question:</label>
        <input
          type="text"
          id="question"
          value={question}
          onChange={handleQuestionChange}
        />
      </div>
      <div>
        <label>Options:</label>
        {options.map((option, index) => (
          <div key={index}>
            <input
              type="checkbox"
              id={`option${index}`}
              value={option}
              onChange={(event) => handleCheckboxChange(event, index)}
            />
            <label htmlFor={`option${index}`}>{`Option ${index + 1}`}</label>
            <input
              type="text"
              value={option}
              onChange={(event) => handleOptionChange(index, event)}
            />
          </div>
        ))}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default Demo;
