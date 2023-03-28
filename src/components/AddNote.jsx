import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';
const AddNote = (props) => {
    const context = useContext(noteContext);
    const {addNote} = context;
    const [note,setNote] = useState({
        title:"",
        description:"",
        tag:""
    })
    const handleAdd = (event)=>{
        event.preventDefault();
        addNote(note.title,note.description, note.tag);
        setNote({
            title:"",
            description:"",
            tag:""
        });
        props.showAlert("Note Added Successfully","success")
    }
    const onChange = (event)=>{
        const changedName= event.target.name;
        const changedValue = event.target.value;
        setNote({...note,[changedName]:changedValue});
    }
  return (
        <div>
      <h2 style={{fontFamily:"Playfair Display"}}>Add a note</h2>
        <div className='container my-3' >
        <form>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" value={note.title} className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} style={{width:"80%"}} minLength={3} required/>
            </div>
            <div className="mb-3">
                <label htmlFor='desc' className="form-label">Description</label>
                <textarea type="text" value={note.description} className="form-control" id="description" name='description' onChange={onChange} style={{width:"80%",height:"100px"}}  minLength={3} required/>
            </div>
            <div className="mb-3">
                <label htmlFor='tag' className="form-label">Tag</label>
                <input type="text" value={note.tag} className="form-control" id="tag" name='tag' onChange={onChange} style={{width:"80%"}} minLength={3} required/>
            </div>
            <button type="submit" disabled={note.title.length<3 || note.description.length<3} onClick={handleAdd} style={{borderRadius:"50%",backgroundColor:"#F2BE22",fontSize:"25px",color:"#fff",width:"40px",border:"1px solid black",margin:"10px"}}>+</button>
        </form>
        </div>
    </div>
  );
};

export default AddNote;
