// FormBuilder.js
import React, { useState } from 'react';
import axios from 'axios';

const FormBuilder = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    type: '',
    sentence: '',
    options: [],
    categories: [],
    description: '',
    feedback: '',
    points: 0,
  });

  const addQuestion = () => {
    setQuestions([...questions, { ...newQuestion }]);
    setNewQuestion({
      type: '',
      sentence: '',
      options: [],
      categories: [],
      description: '',
      feedback: '',
      points: 0,
    });
  };

  const saveForm = async () => {
    try {
      const response = await axios.post('http://localhost:5010/api/formsdata', { questions });
      console.log(response.data);
      // Handle successful response
    } catch (error) {
      console.error(error);
      // Handle error response
    }
  };

  return (
    <div>
      <h2>Form Builder</h2>

      {/* Question Type: Cloze */}
      <div>
        <h3>Cloze Question</h3>
        <label>Sentence:</label>
        <input
          type="text"
          value={newQuestion.sentence}
          onChange={(e) => setNewQuestion({ ...newQuestion, sentence: e.target.value })}
        />
        <label>Options:</label>
        <input
          type="text"
          value={newQuestion.options.join(',')}
          onChange={(e) => setNewQuestion({ ...newQuestion, options: e.target.value.split(',') })}
        />
        {/* Add more fields for Feedback, Points, etc. */}
      </div>

      {/* Question Type: Categorize */}
      <div>
        <h3>Categorize Question</h3>
        {/* Add fields for Categories, Items, etc. */}
      </div>

      {/* Question Type: Comprehension */}
      <div>
        <h3>Comprehension Question</h3>
        {/* Add fields for Instructions, Passage, Media, Points, etc. */}
      </div>

      <button onClick={addQuestion}>Add Question</button>

      <div>
        <h3>Preview</h3>
        {questions.map((q, index) => (
          <div key={index}>
            <p>{q.sentence}</p>
            {/* Display other question details */}
          </div>
        ))}
      </div>

      <button onClick={saveForm}>Save Form</button>
    </div>
  );
};

export default FormBuilder;
