// import React, { useState } from 'react';
// import axios from 'axios';

// const FormEditor = () => {
//   const [form, setForm] = useState({ title: '', questions: [] });

//   const handleAddQuestion = () => {
//     setForm({
//       ...form,
//       questions: [...form.questions, { question: '', answer: '' }],
//     });
//   };

//   const handleSaveForm = async () => {
//     try {
//       await axios.post('http://localhost:5000/api/forms', form);
//       alert('Form saved successfully!');
//     } catch (error) {
//       console.error('Error saving form:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Form Editor</h2>
//       <label>Title:</label>
//       <input
//         type="text"
//         value={form.title}
//         onChange={(e) => setForm({ ...form, title: e.target.value })}
//       />
//       <button onClick={handleAddQuestion}>Add Question</button>
//       {form.questions.map((question, index) => (
//         <div key={index}>
//           <label>Question:</label>
//           <input
//             type="text"
//             value={question.question}
//             onChange={(e) => {
//               const updatedQuestions = [...form.questions];
//               updatedQuestions[index].question = e.target.value;
//               setForm({ ...form, questions: updatedQuestions });
//             }}
//           />
//           <label>Answer:</label>
//           <input
//             type="text"
//             value={question.answer}
//             onChange={(e) => {
//               const updatedQuestions = [...form.questions];
//               updatedQuestions[index].answer = e.target.value;
//               setForm({ ...form, questions: updatedQuestions });
//             }}
//           />
//         </div>
//       ))}
//       <button onClick={handleSaveForm}>Save Form</button>
//     </div>
//   );
// };

// export default FormEditor;



// import React, { useState } from 'react';
// import axios from 'axios';


// const FormEditor = () => {
//     const initialFormState = {
//         title: '',
//         headerImage: '',
//         questions: [],
//       };
    
//       const [form, setForm] = useState(initialFormState);

//   const handleAddQuestion = () => {
//     setForm({
//       ...form,
//       questions: [...form.questions, { type: '', content: '', imageUrl: '' }],
//     });
//   };
// //   useEffect(() => {
// //     const fetchData = async () => {
// //       const response = await axios.get('http://localhost:5000/api/forms/:formId');
// //       setForm(response.data);
// //     };
// //     fetchData();
// //   }, []); 
//   const handleSaveForm = async (e) => {
//     e.preventDefault();
//     if(form.title === "" || form.headerImage ===""){
//         alert("all fields are mandatory")
//     }
//     else{ 
//     try {
//       const postdata = await axios.post('http://localhost:5000/api/forms', form);
//       alert('Form saved successfully!');
//       setForm(initialFormState); 

//       console.log(postdata);
//     } catch (error) {
//       console.error('Error saving form:', error);
//     }
//     }
//   };
//   const handleResetForm = () => {
//     setForm(initialFormState);
//   };
//   return (
//     <div className='form-div'>
//       <h2>Form Editor</h2>
//       <label>Title:</label>
//       <input
//         type="text"
//         value={form.title}
//         onChange={(e) => setForm({ ...form, title: e.target.value })}
//       />
//       <label>Header Image URL:</label>
//       <input
//         type="text"
//         value={form.headerImage}
//         onChange={(e) => setForm({ ...form, headerImage: e.target.value })}
//       />
//       <button onClick={handleAddQuestion}>Add Question</button>
//       {form.questions.map((question, index) => (
//         <div key={index}>
//           <label>Type:</label>
//           <input
//             type="text"
//             value={question.type}
//             onChange={(e) => {
//               const updatedQuestions = [...form.questions];
//               updatedQuestions[index].type = e.target.value;
//               setForm({ ...form, questions: updatedQuestions });
//             }}
//           />
//           <label>Content:</label>
//           <input
//             type="text"
//             value={question.content}
//             onChange={(e) => {
//               const updatedQuestions = [...form.questions];
//               updatedQuestions[index].content = e.target.value;
//               setForm({ ...form, questions: updatedQuestions });
//             }}
//           />
//           <label>Image URL:</label>
//           <input
//             type="text"
//             value={question.imageUrl}
//             onChange={(e) => {
//               const updatedQuestions = [...form.questions];
//               updatedQuestions[index].imageUrl = e.target.value;
//               setForm({ ...form, questions: updatedQuestions });
//             }}
//           />
//         </div>
//       ))}
//       <button onClick={handleSaveForm}>Save Form</button>
//       <button onClick={handleResetForm}>Reset Form</button>
//     </div>
//   );
// };

// export default FormEditor;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './FormEditor.css';

const FormEditor = () => {
  const initialFormState = {
    title: '',
    headerImage: '',
    questions: [],
  };

  const [form, setForm] = useState(initialFormState);

  useEffect(() => {
    // Fetch initial data or perform other actions on mount if needed
  }, []);

  const handleAddQuestion = (type) => {
    setForm({
      ...form,
      questions: [
        ...form.questions,
        {
          type,
          content: '',
          categories: [],
          items: [],
          sentence: '',
          blanks: [],
          comprehension: { instructions: '', passage: '', media: '', points: 0 },
        },
      ],
    });
  };

  const handleSaveForm = async () => {
    try {
      await axios.post('http://localhost:5000/api/forms', form);
      alert('Form saved successfully!');
      setForm(initialFormState);
    } catch (error) {
      console.error('Error saving form:', error);
    }
  };

  const handleResetForm = () => {
    setForm(initialFormState);
  };

  return (
    <div className="form-editor-container form-div">
      <h2>Form Editor</h2>
      <label>Title:</label>
      <input
        type="text"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      {/* ... (previous code) */}
         <label>Header Image URL:</label>
         <input
        type="text"
        value={form.headerImage}
        onChange={(e) => setForm({ ...form, headerImage: e.target.value })}
      />
      <button onClick={handleAddQuestion}>Add Question</button>
      {form.questions.map((question, index) => (
        <div key={index}>
          <label>Type:</label>
          <input
            type="text"
            value={question.type}
            onChange={(e) => {
              const updatedQuestions = [...form.questions];
              updatedQuestions[index].type = e.target.value;
              setForm({ ...form, questions: updatedQuestions });
            }}
          />
          <label>Content:</label>
          <input
            type="text"
            value={question.content}
            onChange={(e) => {
              const updatedQuestions = [...form.questions];
              updatedQuestions[index].content = e.target.value;
              setForm({ ...form, questions: updatedQuestions });
            }}
          />
          <label>Image URL:</label>
          <input
            type="text"
            value={question.imageUrl}
            onChange={(e) => {
              const updatedQuestions = [...form.questions];
              updatedQuestions[index].imageUrl = e.target.value;
              setForm({ ...form, questions: updatedQuestions });
            }}
          />
        </div>
      ))}
      <div className="form-buttons">
        <button onClick={() => handleAddQuestion('Categorize')}>Add Categorize Question</button>
        <button onClick={() => handleAddQuestion('Cloze')}>Add Cloze Question</button>
        <button onClick={() => handleAddQuestion('Comprehension')}>Add Comprehension Question</button>
        <button onClick={handleSaveForm}>Save Form</button>
        <button onClick={handleResetForm}>Reset Form</button>
      </div>
      {/* Render questions based on type */}
      {form.questions.map((question, index) => (
        <div key={index} className="question-container">
          <h3>{`Question ${index + 1} (${question.type})`}</h3>
          <label>Content:</label>
          <input
            type="text"
            value={question.content}
            onChange={(e) => {
              const updatedQuestions = [...form.questions];
              updatedQuestions[index].content = e.target.value;
              setForm({ ...form, questions: updatedQuestions });
            }}
          />
          {question.type === 'Categorize' && (
            <>
              {/* Categorize specific fields */}
              <label>Categories:</label>
              <input
                type="text"
                value={question.categories.join(', ')}
                onChange={(e) => {
                  const updatedQuestions = [...form.questions];
                  updatedQuestions[index].categories = e.target.value.split(',').map((category) => category.trim());
                  setForm({ ...form, questions: updatedQuestions });
                }}
              />
              <label>Items:</label>
              <ul>
                {question.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
            </>
          )}
          {question.type === 'Cloze' && (
            <>
              {/* Cloze specific fields */}
              <label>Sentence:</label>
              <textarea
                value={question.sentence}
                onChange={(e) => {
                  const updatedQuestions = [...form.questions];
                  updatedQuestions[index].sentence = e.target.value;
                  setForm({ ...form, questions: updatedQuestions });
                }}
              ></textarea>
              <label>Blanks:</label>
              <ul>
                {question.blanks.map((blank, blankIndex) => (
                  <li key={blankIndex}>{blank}</li>
                ))}
              </ul>
            </>
          )}
          {question.type === 'Comprehension' && (
            <>
              {/* Comprehension specific fields */}
              <label>Instructions:</label>
              <textarea
                value={question.comprehension.instructions}
                onChange={(e) => {
                  const updatedQuestions = [...form.questions];
                  updatedQuestions[index].comprehension.instructions = e.target.value;
                  setForm({ ...form, questions: updatedQuestions });
                }}
              ></textarea>
              <label>Passage:</label>
              <textarea
                value={question.comprehension.passage}
                onChange={(e) => {
                  const updatedQuestions = [...form.questions];
                  updatedQuestions[index].comprehension.passage = e.target.value;
                  setForm({ ...form, questions: updatedQuestions });
                }}
              ></textarea>
              <label>Media:</label>
              <input
                type="text"
                value={question.comprehension.media}
                onChange={(e) => {
                  const updatedQuestions = [...form.questions];
                  updatedQuestions[index].comprehension.media = e.target.value;
                  setForm({ ...form, questions: updatedQuestions });
                }}
              />
              <label>Points:</label>
              <input
                type="number"
                value={question.comprehension.points}
                onChange={(e) => {
                  const updatedQuestions = [...form.questions];
                  updatedQuestions[index].comprehension.points = parseInt(e.target.value, 10);
                  setForm({ ...form, questions: updatedQuestions });
                }}
              />
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default FormEditor;
