import React from "react";

// This file exports the Input, TextArea, and FormBtn components

export function Input(props) {
  return (
    <div className="form-group">
      <input className="form-control"   onChange={props.handleInputChange}
          value={props.value}
          name="search"
          type="text"
          placeholder="Search for books"
          id="search" />
    </div>
  );
}

export function TextArea(props) {
  return (
    <div className="form-group">
      <textarea className="form-control" rows="20" {...props} />
    </div>
  );
}

export function FormBtn(props) {
  return (
    <button {...props} style={{ float: "right", marginBottom: 10 }} className="btn btn-success" onClick={props.handleFormSubmit}>
      {props.children}
    </button>
  );
}

export function SaveBtn(props) {
  return (
    <button {...props} className="btn btn-success">
      {props.children}
    </button>
  );
}
