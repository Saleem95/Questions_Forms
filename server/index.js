// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const app = express();
// const cors = require('cors'); // Add this line
// const PORT = 5010;

// app.use(bodyParser.json());
// // Set Content Security Policy header
// app.use(cors()); // Add this line

// app.use((req, res, next) => {
//   res.setHeader('Content-Security-Policy', "default-src 'self'; font-src 'self' https://fonts.gstatic.com;");
//   next();
// });

// mongoose.connect('mongodb://localhost:27017/MyDatabase', { useNewUrlParser: true, useUnifiedTopology: true });


// const FormSchema = new mongoose.Schema({
//   // Define your form schema here, including the categorize question structure
//   title: String,
//   questions: [{
//     type: {
//       type: String,
//       enum: ['categorize'],
//       default: 'categorize',
//     },
//     title: String,
//     categories: [String],
//     items: [{
//       text: String,
//       categories: [String],
//     }],
//     description: String,
//     feedback: String,
//     points: Number,
//   }],
// });

// const Form = mongoose.model('Form', FormSchema);

// app.get('/api/formsdata', async (req, res) => {
//   try {
//     const forms = await Form.find();
//     res.json(forms);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Server Error');
//   }
// });
// app.post('/api/forms', async (req, res) => {
//   try {
//     const formData = req.body;
//     const newForm = new Form(formData);
//     await newForm.save();
//     res.json(newForm);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Server Error');
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/MyDatabase', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // Define your MongoDB schema
// const formSchema = new mongoose.Schema({
//   title: String,
//   questions: [{ question: String, answer: String }],
// });

// const Form = mongoose.model('Form', formSchema);

// app.get('/api/formsdata', async (req, res) => {
//   try {
//     const forms = await Form.find();
//     res.json(forms);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Server Error');
//   }
// });
// // API endpoint to save a form
// app.post('/api/forms', async (req, res) => {
//   try {
//     const { title, questions } = req.body;
//     const newForm = new Form({ title, questions });
//     await newForm.save();
//     res.json({ success: true, message: 'Form saved successfully' });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// mongoose.connect('mongodb://localhost:27017/MyDatabase', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const questionSchema = new mongoose.Schema({
//   type: String, // "Categorize", "Cloze", "Comprehension", etc.
//   content: String,
//   imageUrl: String,
// });

// const formSchema = new mongoose.Schema({
//   title: String,
//   headerImage: String,
//   questions: [questionSchema],
// });

// const Form = mongoose.model('Form', formSchema);

// app.get('/api/formsdata', async (req, res) => {
//   try {
//     const forms = await Form.find();
//     res.json(forms);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Server Error');
//   }
// });
// app.post('/api/forms', async (req, res) => {
//   try {
//     const { title, headerImage, questions } = req.body;
//     const newForm = new Form({ title, headerImage, questions });
//     await newForm.save();
//     res.json({ success: true, message: 'Form saved successfully' });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });



const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5010;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/MyDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const categorizeQuestionSchema = new mongoose.Schema({
  categories: [String],
  items: [
    {
      content: String,
      category: String,
    },
  ],
  description: String,
  feedback: String,
  points: Number,
});

const CategorizeQuestion = mongoose.model('CategorizeQuestion', categorizeQuestionSchema);


app.get('/api/formsdata', async (req, res) => {
  try {
    const forms = await CategorizeQuestion.find();
    res.json(forms);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});
app.post('/api/categorizeQuestions', async (req, res) => {
  try {
    const {
      categories,
      items,
      description,
      feedback,
      points,
    } = req.body;

    const newQuestion = new CategorizeQuestion({
      categories,
      items,
      description,
      feedback,
      points,
    });

    await newQuestion.save();

    res.json({ success: true, message: 'Categorize question saved successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
