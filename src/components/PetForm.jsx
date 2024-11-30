// src/components/PetForm.jsx

import { useState } from 'react';

const PetForm = (props) => {
  // formData state to control the form
  const initialState = {
    name: '',
    age: '',
    breed: ''
  }
  // If pet data has been passed as props, we set formData as that pet object.
  // Otherwise, we can assume this is a new pet form, and use the empty initialState object.
  const [formData, setFormData] = useState(props.selected ? props.selected : initialState);

  // handleChange function to update formData state
  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmitForm = (evt) => {
    evt.preventDefault();
    if (props.selected) {
        // Don't forget to pass both formData and the ._id!
        props.handleUpdatePet(formData, props.selected._id);
      } else {
        props.handleAddPet(formData);
      }
    // remove: setFormData({ name: '', age: '', breed: '' });
  };

  return (
    <div>
      <form onSubmit={handleSubmitForm}>
        <label htmlFor="name"> Name </label>
        <input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <label htmlFor="age"> Age </label>
        <input
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
        <label htmlFor="breed"> Breed </label>
        <input
          id="breed"
          name="breed"
          value={formData.breed}
          onChange={handleChange}
        />
        <button type="submit">{props.selected ? 'Update Pet' : 'Add New Pet'}</button>
      </form>
    </div>
  );
};

export default PetForm;
