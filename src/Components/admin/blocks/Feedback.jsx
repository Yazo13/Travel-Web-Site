import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/feedback.css"
function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [newFeedback, setNewFeedback] = useState({ description: '', user_id: '' });
  const [editingFeedback, setEditingFeedback] = useState(null);

  useEffect(() => {
    axios.get('http://localhost/backend/feedback/get_feedback.php')
      .then(response => {
        setFeedbacks(response.data);
      })
      .catch(error => {
        console.error('Error fetching feedbacks:', error);
      });
  }, []);

  const addFeedback = (e) => {
    e.preventDefault();

    axios.post('http://localhost/backend/feedback/add_feedback.php', newFeedback)
      .then(response => {
        setFeedbacks([...feedbacks, response.data]);
        setNewFeedback({ description: '', user_id: '' });
        window.location.reload();
      })
      .catch(error => {
        console.error('Error adding feedback:', error);
      });
  };

  const updateFeedback = (e) => {
    e.preventDefault();

    axios.post('http://localhost/backend/feedback/edit_feedback.php', editingFeedback)
      .then(response => {
        setFeedbacks(feedbacks.map(feedback => feedback.id === editingFeedback.id ? response.data : feedback));
        setEditingFeedback(null);
        window.location.reload();
      })
      .catch(error => {
        console.error('Error updating feedback:', error);
      });
  };

  const deleteFeedback = (id) => {
    axios.delete(`http://localhost/backend/feedback/delete_feedback.php?del_feedback=${id}`)
      .then(() => {
        setFeedbacks(feedbacks.filter(feedback => feedback.id !== id));
        window.location.reload();
      })
      .catch(error => {
        console.error('Error deleting feedback:', error);
      });
  };

  return (
    <div>
      <h1 style={{fontStyle: 'italic', marginTop: '10px'}}>Feedback Table</h1>
      <form className="add-feedback-form" onSubmit={addFeedback}>
        <textarea
          style={{width: '300px'}}
          type="text"
          placeholder="Description"
          value={newFeedback.description}
          onChange={(e) => setNewFeedback({ ...newFeedback, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="User ID"
          value={newFeedback.user_id}
          onChange={(e) => setNewFeedback({ ...newFeedback, user_id: e.target.value })}
        />
        <button type="submit">Add Feedback</button>
      </form>
      {editingFeedback && (
        <>
          <h2>Edit Feedback</h2>
          <form className="edit-feedback-form" onSubmit={updateFeedback}>
            <textarea
                style={{ width: '300px' }}
                type="text"
                placeholder="Description"
                value={editingFeedback.description}
                onChange={(e) => setEditingFeedback({ ...editingFeedback, description: e.target.value })}
            />
            <input
                type="text"
                placeholder="User ID"
                value={editingFeedback.user_id}
                onChange={(e) => setEditingFeedback({ ...editingFeedback, user_id: e.target.value })}
            />
            <button type="submit">Update Feedback</button>
            <button onClick={() => setEditingFeedback(null)}>Cancel</button>
            </form>
        </>
      )}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Username</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map(feedback => (
            <tr key={feedback.id}>
              <td>{feedback.id}</td>
              <td>{feedback.description}</td>
              <td>{feedback.Username}</td>
              <td>{feedback.name}</td>
              <td className='buttons'>
                <button onClick={() => setEditingFeedback(feedback)}>Edit</button>
                <button onClick={() => deleteFeedback(feedback.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Feedback;
