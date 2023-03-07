import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Registration, Main } from './pages';

// const data = {
//   email: 'n@gmail.com',
//   password: '123456',
// };

function App() {
  // const onSubmitForm = (e) => {
  //   e.preventDefault();
  //   (async () => {
  //     const rawResponse = await fetch('/api/registration', {
  //       method: 'POST',
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(data),
  //     });
  //     const content = await rawResponse.json();

  //     console.log(content);
  //   })();
  // };

  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route path='*' element={<Main />} />
          <Route path='registration' element={<Registration />} />
        </Routes>
        {/* <form onSubmit={(e) => onSubmitForm(e)}>
        <input type='text' />
        <button>send</button>
      </form> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
