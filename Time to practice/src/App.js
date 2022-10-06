import React,{useState} from 'react';
import UserInput from './components/Users/UserInput';
import UserInputList from './components/Users/UserInputList';


function App() {
   const [usersList,setUsersList]=useState([]);

   const addUserHandler=(uName,uAge)=>{
     setUsersList((prevUsersList)=>{
       return [...prevUsersList,{name:uName,age:uAge,id:Math.random().toString}]
     })
   }
  
  return(

<div>
<UserInput onAddUser={addUserHandler}></UserInput>
<UserInputList users={usersList}></UserInputList>
</div>
  )
}

export default App;
