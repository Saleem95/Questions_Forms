import React, { useState } from 'react';
import axios from 'axios';

const FormBuilder = () => {
  const [sentence, setSentence] = useState('');
  const [underlinedWords, setUnderlinedWords] = useState([]);
  const [options, setOptions] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [points, setPoints] = useState(0);

  // ... (previous code)

  const saveForm = async () => {
    try {
      const response = await axios.post('http://localhost:5010/api/formsdata', {
        sentence,
        underlinedWords,
        options,
        feedback,
        points,
      });

      console.log(response.data);
      // Handle successful response
    } catch (error) {
      console.error(error);
      // Handle error response
    }
  };

  return (
    <div>
      {/* ... (previous code) */}

      <button onClick={saveForm}>Save Form</button>
    </div>
  );
};

export default FormBuilder;
