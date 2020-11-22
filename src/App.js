import axios from 'axios';
import { useEffect } from 'react';
import { Button } from 'antd';
import './app.css'

function App() {
  // const data = {
  //   title: 'title',
  //   desc: 'desc',
  //   tags: 'tags',
  //   content: 'content',
  //   content: 'content',
  // }
  const data = {
    username: 'guest01',
    password: '123456',
    remeber: true,
    type: 'guest'
  }
  useEffect(()=> {

    // axios.post('/register', data)
    // .then((res)=> {
    //   console.log(res.data)
    // })
    // axios.post('/login', data)
    // .then((res)=> {
    //   console.log(res.data)
    // })


  }, [])

  return (
    <div className="App">
      div
      <Button type='primary'>Click me</Button>
    </div>
  );
}

export default App;
