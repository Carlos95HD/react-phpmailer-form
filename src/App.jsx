import axios from "axios";
import { useState } from "react";
import { getEnvVariables } from "./helpers/getEnvVariables";
import { useForm } from "./hooks/useForm";

const { VITE_API_PATH } = getEnvVariables();

const initialForm = {
  fname: "",
  lname: "",
  email: "",
  asunto: "Comentario",
  message: "",
};

// path to phpmailer.php
const API_PATH = VITE_API_PATH;

console.log(VITE_API_PATH);

function App() {
  const [formValues, handleInputChange, reset] = useForm(initialForm);
  const [result, setResult] = useState({
    mailSent: false,
    error: null,
  });

  const { fname, lname, email, message } = formValues;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: `${API_PATH}`,
      headers: { "content-type": "application/json" },
      data: formValues,
    })
      .then((result) => {
        setResult({
          mailSent: result,
        });

        //ResetForm
        reset();

        setTimeout(() => {
          setResult({ mailSent: false });
        }, 5000);

        // console.log("FormData", formValues);
        // console.log("Result", result);
      })
      .catch((error) => setResult({ error: error.message }));

  };

  return (
    <div className="app">
      <p>Contact Me</p>
      <div>
        <form action="#">
          <label>First Name</label>
          <input
            type="text"
            id="fname"
            name="fname"
            placeholder="Your name.."
            value={fname}
            onChange={handleInputChange}
          />
          <label>Last Name</label>
          <input
            type="text"
            id="lname"
            name="lname"
            placeholder="Your last name.."
            value={lname}
            onChange={handleInputChange}
          />

          <label>Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your email"
            value={email}
            onChange={handleInputChange}
          />

          <label>Case</label>
          <select name="asunto" onChange={handleInputChange}>
            <option value={"Comentario"}>Comentario</option>
            <option value={"Sugerencia"}>Sugerencia</option>
            <option value={"Reclamo"}>Reclamo</option>
          </select>

          <label>Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="Write something.."
            value={message}
            onChange={handleInputChange}
          ></textarea>
          <input type="submit" onClick={handleFormSubmit} value="Submit" />
        </form>
      </div>

      <div>
        {result.mailSent && !result.error && (
          <div className="alert-success">Thank you for contcting us.</div>
        )}
      </div>
      <div>
        {!result.mailSent && result.error && (
          <div className="alert-danger">Error has occurred try again.</div>
        )}
      </div>
    </div>
  );
}

export default App;
