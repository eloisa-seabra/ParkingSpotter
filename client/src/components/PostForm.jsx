import React from 'react';

const PostForm = props => {
  const handlePostEdition = event => {
    event.preventDefault();
    props.onPostEdition();
  };

  const handleInputChange = event => {
    const parking = event.target.value;
    props.handleChange(parking);
  };

  return (
    <form onSubmit={handlePostEdition}>
      <label htmlFor="location">Location</label>
      <input
        id="location-input"
        type="text"
        name="location"
        value={props.parking}
        onChange={handleInputChange}
      />
      <label htmlFor="description-input">Description</label>
      <input
        id="description-input"
        type="text"
        name="description"
        value={props.parking}
        onChange={handleInputChange}
      />
      <label htmlFor="price-input">Price</label>
      <input
        id="price-input"
        type="number"
        name="price"
        value={props.parking}
        onChange={handleInputChange}
      />
      <button>{props.isEdit ? 'Edit Post' : 'Create Post'}</button>
    </form>
  );
};

export default PostForm;
