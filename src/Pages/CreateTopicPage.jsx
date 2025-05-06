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
      <form onSubmit={handleSubmit} className="create-topic-form" aria-describedby="form-desc">
      <p id="form-desc" className="sr-only">
        All fields are required to create a topic.
        </p>

        {success && (
          <p className="success-message" aria-live="polite">
            Topic successfully created! Redirecting...
          </p>
        )}
        
        {error && (
          <p className="error-message" aria-live="assertive">
            {error}
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
            aria-required="true"
            aria-describedby="slug-desc"
          />
        </label>
        <small id="slug-desc">Choose a short, lowercase topic identifier.</small>

        <label htmlFor="description">
          Enter Topic Description:
          <input
            id="description"
            type="text"
            name="description"
            value={inputs.description || ""}
            onChange={handleChange}
            aria-required="true"
            aria-describedby="description-desc"
          />
        </label>
        <small id="description-desc">Write a short description explaining the topic.</small>

        <input 
        type="submit"
        value="Create Topic"
        aria-label="Create a new topic" />

      </form>
    </div>
  );
}

export default CreateTopicPage;
