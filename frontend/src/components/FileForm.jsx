import React, { useContext } from 'react';
import { AppContext } from '../App';

function FileForm() {
  const { latestPost, setLatestPost } = useContext(AppContext);

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData();

    data.append("post[title]", event.target.title.value);  // Correction ici
    data.append("post[image]", event.target.image.files[0]);
    submitToAPI(data);
  }

  function submitToAPI(data) {
    fetch("http://localhost:3000/posts", {
      method: "POST",
      body: data
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setLatestPost(data.image_url);
      })
      .catch((error) => console.error('Error:', error));
  }

  return (
    <div>
      <h1>FileForm</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" />
        <br />

        <label htmlFor="image">Image</label>
        <input type="file" name="image" id="image" />
        <br />

        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}

export default FileForm;
