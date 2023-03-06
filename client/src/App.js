import './App.css';
const data = {
  email: 'n@gmail.com',
  password: '123456',
};

function App() {
  const onSubmitForm = (e) => {
    e.preventDefault();
    (async () => {
      const rawResponse = await fetch('/api/registration', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const content = await rawResponse.json();
    
      console.log(content);
    })();
  };

  return (
    <div className='App'>
      <form onSubmit={(e) => onSubmitForm(e)}>
        <input type='text' />
        <button>send</button>
      </form>
    </div>
  );
}

export default App;
