import {useState,useEffect} from 'react';
import axios from 'axios';

function App() {

  var [token,setToken]=useState('');
  var [string,setString]=useState('');
  var [data,setData]=useState('');
  var [update,setUpdate]=useState('NotUpdated');

  var values={
    name:"",
    ltp:0,
    lcp:0
  }

  const [body,setBody]= useState(values);

  const searchAxios = axios.create({
    baseURL:`http://3.108.225.220:5000/api/data?search_string=${string}`,
    headers:{
      Authorization:`Bearer ${token}`
    }
  })

  useEffect(()=>{
    axios.get('http://3.108.225.220:5000/api/user-access-token').then(
      (response)=>{
          setToken(response.data.token);
          console.log(response);
      }
    ).catch((error)=>{
      console.log(error);
    })
  },[])

  var handleClick = ()=>{
    console.log(token);
      axios.get(`http://3.108.225.220:5000/api/data?search_string=${string}`,{headers:{'user-access-token':`${token}`}})
      .then((response)=>{
        setData(response.data);
        console.log(response);
        
      }).catch(error=>{console.log(error)})
  }
  const handleInput = (event)=>{
    setString(event.target.value);
    console.log(event.target.value);
  };

  const handleSubmit = (event)=>{
    event.preventDefault();
    console.log(body);
    axios.post('http://3.108.225.220:5000/api/data',body,{headers:{'user-access-token':`${token}`}})
    .then(response=>{
      setUpdate(response.data);
      console.log(response);
    })
    .catch(error=>{
      console.log(error);
    })

  }

  const handleChange = (event)=>{
    var {placeholder,value}=event.target;

    if(placeholder==="ltp" || placeholder ==="lcp")
    value=parseFloat(value);

    setBody({
      ...body,
      [placeholder]:value
    })
    
    
  }

  return (
    <div className="App">
      {/*<h1>{token}</h1> */}
      <input onChange={handleInput}  />
      <button onClick={handleClick}>search</button>
      <div>{data}</div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='name' onChange={handleChange}/>
        <input type="text" placeholder='ltp' onChange={handleChange}/>
        <input type="text" placeholder='lcp' onChange={handleChange}/>
        <input type="submit" />
      </form>
      <h1>{update}</h1>
      
    </div>
  );
}

export default App;
