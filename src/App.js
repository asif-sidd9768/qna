import { InputLabel, FormControl, Select, MenuItem, Button, TextField, Chip, Divider } from '@mui/material';
import './App.css';
import { useState } from 'react';
import questionAndAnswerService from './services/handleQnA'

const App = () => {
  const [category, setCategory] = useState('')
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [score, setScore] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingAnswer, setLoadingAnswer] = useState(false)
  const [answered, setAnswered] = useState(false)
  const [questions, setQuestions] = useState(new Map())
  const handleChange = (event) => {
    console.log(event.target.value)
    setCategory(event.target.value)
  }

  const submitRequest = async () => {
    setLoading(true)
    setAnswered(false)
    setAnswer('')
    setQuestion('')
    setScore('')
    const questionWeGet = await questionAndAnswerService.getQuestion({data: category, questions: Object.fromEntries(questions)})
    setQuestions(questions.set(questions.size+1, questionWeGet))
    setQuestion(questionWeGet)
    setLoading(false)
  }

  const resetRequest = () => {
    setCategory('')
    setQuestion('')
    setAnswer('')
    setScore('')
    setAnswered(false)
  }

  const handleAnswer = (event) => {
    setAnswer(event.target.value)
  }

  const submitAnswer = async () => {
    setAnswered(true)
    setLoadingAnswer(true)
    const scoreReceived = await questionAndAnswerService.getAnswer({question, answer})

    // console.log(scoreReceived.split(" "))
    // const regex = /^(.*)\s-\s(.*)$/;
    // const result = scoreReceived.match(regex);
    // console.log('result ==== ', result)
    // console.log(scoreReceived.match(regex))
    setScore(scoreReceived)
    // extractScore(scoreReceived.split(" "))
    setLoadingAnswer(false)
  }

  const extractScore = string => {
    console.log(string)
    const result = string.split("-");
    console.log('result ==== ', result)
    return result
  }

  const getColor = string => {
    const scoreColor = extractScore(string)[0].split("/")[0]
    console.log(scoreColor)
    return scoreColor > 5 ? 'text-success' : 'text-danger'
  }

  return (
    <div className='w-100 h-100 d-flex justify-content-center bg-dark'>
      <div className='p-3 p-sm-5 w-75 m-5 bg-light rounded-5'>
        <div className='d-flex align-items-center flex-column flex-md-row mt-3 justify-content-center'>
          <FormControl sx={{width: 300 }} className='my-2 px-3' >
            <InputLabel id="demo-simple-select-label" className='ps-3 padding-label'>Select Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Select Category"
              onChange={handleChange}
              className='select-category'
            >
              <MenuItem value={'programming'}>Programming</MenuItem>
              <MenuItem value={'gaming'}>Gaming</MenuItem>
              <MenuItem value={'vehicles'}>Vehicles</MenuItem>
              <MenuItem value={'javascript coding'}>Coding</MenuItem>
            </Select>
          </FormControl>
          <div className='d-flex flex-row align-items-center justify-content-center mt-2'>
          {category && <Button variant="contained" color="success" className='ms-3' onClick={submitRequest}>
            Get a question!
            </Button>}
          {question && <Button variant="contained" color="error" className='ms-3' onClick={resetRequest}>
            Reset
            </Button>}
            </div>
        </div>
        {
          loading && <div className='d-flex justify-content-center flex-column align-items-center mt-5'>
            <div class="typewriter">
              <div class="slide"><i></i></div>
              <div class="paper"></div>
              <div class="keyboard"></div>
            </div>
            <p className='mt-3'>Getting something for you...</p>
          </div>
        }
        {
        question && 
        <div>
          <Divider className='mt-4'>
            <Chip label="Question & Answer" />
          </Divider>
          <div className='mt-4'>
            {/* <p className='ps-3 text-'>Question: </p> */}
            <p className='bg-dark text-light px-3 py-2 rounded-5 text-wrap'>{question}</p>
          </div>
          {/* <p className='ps-3'>Answer : </p> */}
          {!answered && 
          <div>
            <div className='my-4'>
              <TextField
                id="outlined-textarea"
                label="Answer"
                onChange={handleAnswer}
                placeholder="Answer here..."
                multiline
                rows={7}
                fullWidth
              />
            </div>
            <Button variant="contained" color="success" className='ms-3' onClick={submitAnswer}>
              Submit Answer
            </Button>
          </div>}
        </div>
        }
        {
          score && 
          <div className='mt-3 text-start p-3'>
            {/* {score && extractScore(score)[0]} */}
            <p className='score-view'>Score: 
              <span className={`${getColor(score)}`}>
                {extractScore(score)[0]}
              </span></p>
            <p className='score-view'>Reason: {extractScore(score).splice(1,).join(" ")}</p>
          </div>
        }
        {loadingAnswer && 
          <div className='text-center mt-3'>
            <div class="code-loader">
              <span>[</span><span>]</span>
            </div>
            <p>Analyzing</p>
          </div>
        }

        { !question && !category && !answer &&
          <div className='d-flex justify-content-center mt-5'>
            <div class="card">
            <div class="imge">
              <div class="Usericon">
                <a>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 61.7998 61.7998">
                      <path fill="#f9dca4" fill-rule="evenodd" d="M23.255 38.68l15.907.149v3.617l7.002 3.339-15.687 14.719-13.461-15.34 6.239-2.656V38.68z"/><path d="M53.478 51.993A30.813 30.813 0 0 1 30.9 61.8a31.226 31.226 0 0 1-3.837-.237A34.071 34.071 0 0 1 15.9 57.919a31.034 31.034 0 0 1-7.856-6.225l1.283-3.1 11.328-5.054c.875 4.536 4.235 11.535 10.176 15.502a24.128 24.128 0 0 0 11.057-15.318l10.063 4.903z" fill="#677079" fill-rule="evenodd"/><path d="M39.791 42.745c.728.347 1.973.928 2.094.999-2.03 6.368-15.72 8.7-19.756-.756z" fill-rule="evenodd" opacity="0.11"/><path d="M31.129 8.432c21.281 0 12.987 35.266 0 35.266-12.266 0-21.281-35.266 0-35.266z" fill="#ffe8be" fill-rule="evenodd"/><path d="M18.365 24.045c-3.07 1.34-.46 7.687 1.472 7.658a31.974 31.974 0 0 1-1.472-7.658z" fill="#f9dca4" fill-rule="evenodd"/><path d="M44.14 24.045c3.07 1.339.46 7.687-1.471 7.658a31.993 31.993 0 0 0 1.471-7.658z" fill="#f9dca4" fill-rule="evenodd"/><path d="M23.396 15.437c-.592 2.768-.384 5.52-3.008 6.028-.624.12-1.037.965-1.172 1.71a22.896 22.896 0 0 0-.38 4.931c.104.569-.396-1.092-.396-1.092l-.085-3.174s-.037-.608-.023-1.535c.03-1.88.244-4.928 1.196-5.86 1.421-1.39 3.868-1.008 3.868-1.008z" fill="#ad835f" fill-rule="evenodd"/><path d="M39.095 15.437c.592 2.768.385 5.52 3.008 6.028.624.12 1.038.965 1.172 1.71a21.808 21.808 0 0 1 .312 4.947c-.105.57.395-1.092.395-1.092l.166-3.178s.025-.62.01-1.547c-.028-1.88-.242-4.928-1.195-5.86-1.421-1.39-3.868-1.008-3.868-1.008z" fill="#ad835f" fill-rule="evenodd"/><path d="M25.364 46.477c-1.51-1.457-2.718-2.587-3.814-3.718-1.405-1.451-1.881-2.922-2.154-5.498a110.846 110.846 0 0 1-1.043-13.43s1.034 6.333 2.962 9.455c.99 1.603 5.04-2.165 6.655-2.738a2.683 2.683 0 0 1 3.24.782 2.636 2.636 0 0 1 3.213-.782c1.616.573 5.61 3.792 6.656 2.738 2.515-2.536 3.057-9.446 3.057-9.446a113.885 113.885 0 0 1-1.129 13.576c-.363 2.746-.547 3.81-1.486 4.884a30.775 30.775 0 0 1-4.57 4.193c-.828.656-2.267 1.272-5.933 1.25-3.406-.02-4.803-.446-5.654-1.267z" fill="#60350a" fill-rule="evenodd"/><path d="M39.604 15.997a2.638 2.638 0 0 1 2.76 1.227c1.556 2.613 1.685 2.95 1.685 2.95s-.184-4.674-.295-5.23a.697.697 0 0 1 .973.028c.11.222-.444-4.7-3.335-5.644-1.057-3.002-4.754-5.226-4.754-5.226l-.167 1.668a6.056 6.056 0 0 0-5.265-4.145c.667.751.507 1.3.507 1.3a8.152 8.152 0 0 0-3.288-.632c.14.889-.889 1.835-.889 1.835s-.639-.974-3.169-1.307c-.445 1.612-1.28 1.89-2.085 2.641a18.92 18.92 0 0 0-1.861 2.224s.083-1.557.639-2.002c.209-.138-4.716 1.803-2.252 9.036a1.962 1.962 0 0 0-1.945 1.462c1.39.389.815 2.49 1.593 3.852.547-1.58.909-4.658 4.328-3.852 2.448.577 4.798 1.814 7.62 1.913 3.987.139 5.501-1.954 9.2-2.098z" fill="#60350a" fill-rule="evenodd"/><path d="M32.415 38.594a2.774 2.774 0 0 0 2.214-.588c.72-.83 1.307-2.009.215-2.643a8.583 8.583 0 0 0-3.581-1.472 8.595 8.595 0 0 0-3.604 1.47c-1.34.775-.52 1.815.201 2.645a2.774 2.774 0 0 0 2.214.588c-.811-2.824 3.153-2.824 2.341 0z" fill="#ffe8be" fill-rule="evenodd"/>
                    </svg>
                </a>
              </div>
              <p class="UserName">Asif Siddique</p>
              <p class="Id">Software Developer</p>
            </div>
          
            <div class="Description">
              Select the category to start...
            </div>
          
            <div class="social-media">
                  <a href="https://twitter.com/asif_sidd1?s=21&t=WvHQB2s0uyFvkscPrebFIQ" target='_blank' rel="noreferrer">
                      <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                          <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
                      </svg>
                  </a>
                  <a href="https://www.instagram.com/asif_sidd1/" target='_blank' rel="noreferrer">
                      <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                          <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
                      </svg>
                  </a>
                  <a href="https://www.linkedin.com/in/asif-siddique-40912a236" target='_blank' rel="noreferrer">
                      <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                          <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
                      </svg>
                  </a>
              </div>
            </div>
          </div>
        }
      </div>
      
    </div>
  )
}

export default App;
