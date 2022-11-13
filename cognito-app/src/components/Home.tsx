import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios, { AxiosHeaders } from "axios";
import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";

//Tokeni toimii?


export function Home(props: any) {

  const Token = props.Tokeni


  const [data, setData] = useState([]);

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("");

  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const [id, setId] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const [reload, setReload] = useState(false);

  //console.log(props.UserName);
  //console.log(props.JwtToken);

  


  
  //Gets all data
  
  useEffect(() => { 

      axios.get(
        `/spaces`,
        { headers: {Authorization: Token} }
      ).then((response) => {
        setData(response.data);
      });
    }, [Token]);

    if (!data) return null;
  

  console.log(data)


  //Post data
  const onPost = (event: any) => {
    event.preventDefault();
    
    axios.post(`/spaces`,
     { 
        "title": title,
        "description": description,
        "user": props.UserName
     }, 
     { headers: {Authorization: Token} }
     )
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
      window.location.reload()
  }


  //edit
  const onIsEdit = (todo: any) => {
    setIsEdit(true);
    setId(todo.spaceId);
    setEditTitle(todo.name);
    setEditDescription(todo.location);

  }

  const onEdit = (event: any) => {
    event.preventDefault();
    setIsEdit(false);

    axios.put(`/spaces?spaceId=${id}`, { 
        "title": editTitle
     },
     { headers: {Authorization: Token} }
     )
      .then(res => {
        console.log(res);
        console.log(res.data);
        setReload(true);
      })

      axios.put(`/spaces?spaceId=${id}`, { 
        "description": editDescription
     },
     { headers: {Authorization: Token} }
     )
      .then(res => {
        console.log(res);
        console.log(res.data);
        setReload(true);
      })

      
  }

  if (reload == true) {
    window.location.reload()
    setReload(false);
  }

  //delete
  const onDelete = (todo: any) => {
    
    axios.delete(`/spaces?spaceId=${todo.spaceId}`,
    { headers: {Authorization: Token} }
    )
      .then(res => {
        console.log(res);
        console.log(res.data);
      })

      window.location.reload()

  }   

  const filtered = data.filter((todo: any) => 
    todo.user === props.UserName
  )

  const TodoItems = filtered.map((todo: any, index: any) =>
  <li key={index}> <ul>
    {todo.title} <br></br>
    {todo.description} <br></br>
    <button onClick={() => onIsEdit(todo)}>Edit</button>
    <button value={todo.SpaceId} onClick={() => onDelete(todo)}>Poista</button>
    </ul>
  </li>
  
  ) 
    if (props.UserName) {
      

    if (isEdit === false) {
      return(
        <div>
          <h1>Edit todo</h1>
          {TodoItems}
        
          <div>
              <form onSubmit={onPost}>
                <h1>Post content</h1>
                <input 
                value={title}
                onChange = {(event) => setTitle(event.target.value)}
                ></input>
                <input
                value={description}
                onChange= {(event) => setDescription(event.target.value)}
                >
                </input>
                <button type="submit">Postaa</button>
              </form>
            </div>
        </div>
        
      )
    } 
    
    else {
    return (
        <div> <h5> edit Todo input</h5>
            <input 
    value={editTitle}
    onChange = {(event) => setEditTitle(event.target.value)}
    ></input>
    <input 
    value={editDescription}
    onChange = {(event) => setEditDescription(event.target.value)}
    ></input>
    
    <button onClick={onEdit}>Save edit</button>
    <button onClick={() => setIsEdit(false)}>Cancel</button>
                </div>
    )
    }
 
  } else {
    return (
      <h2>Please <Link to='Login'>Login</Link></h2>
    )
  }
}