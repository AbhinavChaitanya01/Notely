import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import Noteitem from "./Noteitem";

function Notes(props) {
  const context = useContext(noteContext);
  const { notes, getNotes,editNote} = context;
  const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }else{
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note,setNote] = useState({
    id:"",
    etitle:"",
    edescription:"",
    etag:""
})
  const handleClick = (event)=>{
    // event.preventDefault();
    // console.log("updating the note...",note);
    editNote(note.id,note.etitle,note.edescription,note.etag);
    refClose.current.click();
    props.showAlert("Note Updated Successfully","success");
    // addNote(note.title,note.description, note.tag);
}
const onChange = (event)=>{
    setNote({...note,[event.target.name]: event.target.value});
}
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id, etitle:currentNote.title, edescription:currentNote.description ,etag:currentNote.tag});
  };
  return (
    <div>
      <AddNote showAlert= {props.showAlert} />
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="container my-3">
                <form>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="etitle"
                      name="etitle"
                      value={note.etitle}
                      aria-describedby="emailHelp"
                      onChange={onChange}
                      style={{ width: "80%" }}
                      minLength={3} required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <textarea
                      type="text"
                      className="form-control"
                      id="edescription"
                      name="edescription"
                      value={note.edescription}
                      onChange={onChange}
                      style={{ width: "80%", height: "100px" }}
                      minLength={3} required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tag" className="form-label">
                      Tag
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="etag"
                      name="etag"
                      value={note.etag}
                      onChange={onChange}
                      style={{ width: "80%" }}
                      minLength={3} required
                    />
                  </div>
                  {/* <button
                    type="submit"
                    onClick={handleAdd}
                    style={{
                      borderRadius: "50%",
                      backgroundColor: "#F2BE22",
                      fontSize: "25px",
                      color: "#fff",
                      width: "40px",
                      border: "1px solid black",
                      margin: "10px",
                    }}
                  >
                    +
                  </button> */}
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <button
                ref= {refClose}
                type="button"
                className="btn btn-dark"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button disabled={note.etitle.length<3 || note.edescription.length<3} onClick={handleClick} type="button" className="btn btn-warning">
                update note
              </button>
            </div>
          </div>
        </div>
      </div>
      <h3 style={{ fontFamily: "Playfair Display" }}>Your notes are here</h3>
      <div className="row my-3">
        <div className="container mx-2"> 
          {notes.length===0 && 'No notes to display'}
        </div>
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} updateNote={updateNote} showAlert= {props.showAlert} note={note} />
          );
        })}
      </div>
    </div>
  );
}
export default Notes;
