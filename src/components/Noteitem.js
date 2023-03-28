import React ,{useContext}from 'react'
import noteContext from '../context/notes/noteContext';
const Noteitem = (props) => {
    const context= useContext(noteContext);
    const {deleteNote} = context;
    const {note,updateNote} = props;
  return (
    <div className="card col-md-6 col-lg-3 mx-2 my-3">
        <div className="card-body my-3">
            <div style={{fontFamily:"Montserrat"}}>
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text" style={{textAlign:"justify",textJustify:"inter-word"}}>{note.description}</p>
            <p className="card-text" style={{fontSize:"10px"}}>{note.tag}</p>
            <div style={{textAlign:"center"}}>
            <i className="fa-solid fa-trash-can" style={{ color:"#F2BE22",fontSize:"20px",marginRight:"20px"}} onClick={()=>{deleteNote(note._id);props.showAlert("Deleted Successfully","success")}} ></i>
            <i className="fa-solid fa-pen-to-square" style={{color:"#F2BE22",fontSize:"20px"}} onClick={()=>{updateNote(note);}}></i>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Noteitem
