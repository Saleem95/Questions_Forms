import React, { useState } from 'react';
import axios from "axios"

const FormBuilder = () => {
  const [form, setForm] = useState({
    title: '',
    questions: [],
  });

  const addCategorizeQuestion = () => {
    setForm((prevForm) => ({
      ...prevForm,
      questions: [
        ...prevForm.questions,
        {
          type: 'categorize',
          title: 'Categorize Question',
          categories: [],
          items: [],
          description: '',
          feedback: '',
          points: 0,
        },
      ],
    }));
  };

  const handleCategoryChange = (index, categories) => {
    setForm((prevForm) => {
      const updatedQuestions = [...prevForm.questions];
      updatedQuestions[index].categories = categories;
      return { ...prevForm, questions: updatedQuestions };
    });
  };

  const handleItemChange = (questionIndex, itemIndex, item) => {
    setForm((prevForm) => {
      const updatedQuestions = [...prevForm.questions];
      updatedQuestions[questionIndex].items[itemIndex] = item;
      return { ...prevForm, questions: updatedQuestions };
    });
  };

  const handleDragStart = (e, questionIndex, itemIndex) => {
    e.dataTransfer.setData('questionIndex', questionIndex.toString());
    e.dataTransfer.setData('itemIndex', itemIndex.toString());
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetQuestionIndex) => {
    const sourceQuestionIndex = parseInt(e.dataTransfer.getData('questionIndex'));
    const sourceItemIndex = parseInt(e.dataTransfer.getData('itemIndex'));

    if (sourceQuestionIndex !== targetQuestionIndex) {
      // Moving an item between questions is not supported in this example
      return;
    }

    const updatedItems = [...form.questions[sourceQuestionIndex].items];
    const [draggedItem] = updatedItems.splice(sourceItemIndex, 1);
    updatedItems.splice(targetQuestionIndex, 0, draggedItem);

    setForm((prevForm) => {
      const updatedQuestions = [...prevForm.questions];
      updatedQuestions[sourceQuestionIndex].items = updatedItems;
      return { ...prevForm, questions: updatedQuestions };
    });
  };

  const saveForm = async () => {
    try {
      const response = await axios.post('http://localhost:5010/api/formsdata');
  
      if (!response.ok) {
        // Handle error responses here
        console.error(`Server returned status: ${response.status}`);
        return;
      }
  
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div>
      <h2>Form Builder</h2>
      <button onClick={addCategorizeQuestion}>Add Categorize Question</button>
      <div>
        {form.questions.map((question, questionIndex) => (
          <div key={questionIndex}>
            <h3>{question.title}</h3>
            <div>
              <label>Categories:</label>
              <input
                type="text"
                value={question.categories.join(',')}
                onChange={(e) => handleCategoryChange(questionIndex, e.target.value.split(','))}
              />
            </div>
            <div>
              <h4>Items:</h4>
              {question.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  draggable
                  onDragStart={(e) => handleDragStart(e, questionIndex, itemIndex)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, itemIndex)}
                >
                  <input
                    type="text"
                    value={item.text}
                    onChange={(e) => handleItemChange(questionIndex, itemIndex, { text: e.target.value })}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button onClick={saveForm}>Save Form</button>
    </div>
  );
};

export default FormBuilder;
