import { useState } from "react";
import { createTopic } from "../utils/api";
import { useNavigate } from "react-router-dom";

function CreateTopicPage() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);

    if (!inputs.slug || !inputs.description) {
      setError("Please fill in both the topic name AND description.");
      return;
    }

    createTopic(inputs)
      .then((response) => {
        console.log("Topic posted!", response);
        setSuccess(true);
        setInputs({});
        setTimeout(() => navigate("/topics"), 2000);
      })
      .catch((err) => {
        console.error("Error posting topic", err);
        setError("Error posting topic! Please try again.");
      });
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  return (
    <div className="create-topic-container">
      <h1>📝 Create a New Topic</h1>
      <form onSubmit={handleSubmit} className="create-topic-form">
        {success && (
          <p className="success-message">
            Topic successfully created! Redirecting...
          </p>
        )}
        <label htmlFor="slug">
          Enter Topic Name:
          <input
            id="slug"
            type="text"
            name="slug"
            value={inputs.slug || ""}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          Enter Topic Description:
          <input
            id="description"
            type="text"
            name="description"
            value={inputs.description || ""}
            onChange={handleChange}
          />
        </label>
        {error && <p className="error-message">{error}</p>}
        <input type="submit" />
      </form>
    </div>
  );
}

export default CreateTopicPage;
