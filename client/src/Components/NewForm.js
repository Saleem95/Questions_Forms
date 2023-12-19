import React, { useState } from 'react';
import axios from 'axios';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const initialItem = { content: '', category: '' };

const CategorizeQuestionForm = () => {
  const [questionData, setQuestionData] = useState({
    categories: [],
    items: [initialItem],
    description: '',
    feedback: '',
    points: 0,
  });

  const handleAddCategory = () => {
    setQuestionData({
      ...questionData,
      categories: [...questionData.categories, 'New Category'],
    });
  };

  const handleAddItem = () => {
    setQuestionData({
      ...questionData,
      items: [...questionData.items, { ...initialItem }],
    });
  };

  const handleCategoryChange = (index, value) => {
    const updatedCategories = [...questionData.categories];
    updatedCategories[index] = value;

    setQuestionData({
      ...questionData,
      categories: updatedCategories,
    });
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...questionData.items];
    updatedItems[index][field] = value;

    setQuestionData({
      ...questionData,
      items: updatedItems,
    });
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const updatedItems = [...questionData.items];
    const [reorderedItem] = updatedItems.splice(result.source.index, 1);
    updatedItems.splice(result.destination.index, 0, reorderedItem);

    setQuestionData({
      ...questionData,
      items: updatedItems,
    });
  };

  const handleSaveQuestion = async () => {
    try {
      await axios.post('http://localhost:5000/api/categorizeQuestions', questionData);
      alert('Categorize question saved successfully!');
      // Optionally, you can reset the form after saving
      setQuestionData({
        categories: [],
        items: [initialItem],
        description: '',
        feedback: '',
        points: 0,
      });
    } catch (error) {
      console.error('Error saving categorize question:', error);
    }
  };

  return (
    <div>
      <h2>Categorize Question Form</h2>
      <label>Description:</label>
      <input
        type="text"
        value={questionData.description}
        onChange={(e) => setQuestionData({ ...questionData, description: e.target.value })}
      />

      <label>Feedback:</label>
      <input
        type="text"
        value={questionData.feedback}
        onChange={(e) => setQuestionData({ ...questionData, feedback: e.target.value })}
      />

      <label>Points:</label>
      <input
        type="number"
        value={questionData.points}
        onChange={(e) => setQuestionData({ ...questionData, points: e.target.value })}
      />

      <h3>Categories</h3>
      <button onClick={handleAddCategory}>Add Category</button>
      {questionData.categories.map((category, index) => (
        <div key={index}>
          <input
            type="text"
            value={category}
            onChange={(e) => handleCategoryChange(index, e.target.value)}
          />
        </div>
      ))}

      <h3>Items</h3>
      <button onClick={handleAddItem}>Add Item</button>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="items">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {questionData.items.map((item, index) => (
                <Draggable key={index} draggableId={`item-${index}`} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div>
                        <input
                          type="text"
                          value={item.content}
                          onChange={(e) => handleItemChange(index, 'content', e.target.value)}
                        />
                      </div>
                      <div>
                        <select
                          value={item.category}
                          onChange={(e) => handleItemChange(index, 'category', e.target.value)}
                        >
                          <option value="" disabled>
                            Select Category
                          </option>
                          {questionData.categories.map((category, catIndex) => (
                            <option key={catIndex} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                      </div>
                    </li>
                  )}
                </Draggable>
              ))}
            </ul>
          )}
        </Droppable>
      </DragDropContext>

      <button onClick={handleSaveQuestion}>Save Question</button>
    </div>
  );
};

export default CategorizeQuestionForm;
