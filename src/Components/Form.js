import React, { useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import "./Form.css";
function Form() {
  const [final, setFinal] = useState({
    segment_name: "",
    schema: [],
  });
  const [options, setOptions] = useState([
    "null",
    "first name",
    "last name",
    "gender",
    "age",
    "account name",
    "city",
    "state",
  ]);
  const [name, setname] = useState();

  const [components, setComponents] = useState([]);

  const url = "https://webhook.site/2d2a6398-6c94-411c-a7a7-266765ccbfd1";

  function remove(ent) {
    const newOptions = options.filter((val) => {
      return val !== ent.target.value.toLowerCase();
    });
    setOptions(newOptions);

    setname(`{${ent.target.value.toLowerCase()}`);
    
    if (ent.target.tagName === "INPUT") {
      setFinal((details) => {
        return {
          ...final,
          segment_name: ent.target.value.replace(/ /g, "_"),
        };
      });
    } else {
      setFinal((prevdetail) => {
        return {
          ...prevdetail,
          schema: [
            ...prevdetail.schema,
            {
              [ent.target.value.toLowerCase().replace(/ /g, "_")]:
                ent.target.value,
            },
          ],
        };
      });
    }
  }

  function clicker(e) {
    e.preventDefault();
    setComponents([
      ...components,
      <>
        <select
          className="dropDown"
          key={Math.floor(Math.random() * 10 + 1)}
          onChange={remove}
          name={name}
        >
          {options.map((option, ind) => (
            <option key={ind} name={option}>
              {option.toUpperCase()}
            </option>
          ))}
        </select>
        <br />
      </>,
    ]);
  }

  function submit(e) {
    e.preventDefault();
    fetch(url, {
      method: "POST",
      body: JSON.stringify(final),
    });
  }

  return (
    <>
      <div className="header">
        <KeyboardArrowLeftIcon />
        <h2> Saving Segment</h2>
      </div>
      <form className="formContainer">
        <div className="segmentName_container">
          <p>Enter the name of the Segment</p>
          <input
            onChange={remove}
            type="text"
            name="name"
            placeholder="Name of the segment"
          />
        </div>
        <div className="notes">
          <p>
            To save your segment,you need to add the schemas to build the query
          </p>
        </div>
        <div className="dropDown_container">{components}</div>
        <p className="newDrop_down" onClick={clicker}>
          +Add new segment
        </p>
      </form>
      <div className="footer">
        <button onClick={submit} className="save Button">
          Save the segment
        </button>
        <button className="cancel Button">Cancel</button>
      </div>
    </>
  );
}

export default Form;
