import axios from 'axios'
const baseUrl = 'https://misty-rose-pantsuit.cyclic.app/api/fun'

const getQuestion = async (category) => {
  console.log('===== ',category)
  try {
    const response = await axios.post(`${baseUrl}/question`, category)
    return response.data
  }catch(e) {
    console.log('avc == ',e)
  } 
}

const getAnswer = async data => {
  try {
    const response = await axios.post(`${baseUrl}/answer`, data)
    return response.data
  }catch(e) {
    console.log('avc == ',e)
  } 
}

export default { getQuestion, getAnswer }