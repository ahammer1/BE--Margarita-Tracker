import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createRecipes, updateRecipe } from '../../api/recipeData';

const initialState = {
  name: '',
  description: '',
  ingredients: '',
  image: '',
  prepTime: '',
};

function RecipeForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.id) {
      setFormInput(obj);
    }
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      updateRecipe(formInput).then(() => router.push(`/recipe/${obj.id}`));
    } else {
      const payload = { ...formInput, UserId: user.uid };
      createRecipes(payload).then(({ name }) => {
        const patchPayload = { id: name };
        updateRecipe(patchPayload).then(() => {
          router.push('/Recipes');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1 className="text-white mt-5">{obj.id ? 'Update' : 'Add'} Recipe</h1>

      {/* name  */}
      <FloatingLabel controlId="floatingInput1" label="Name" className="mb-3">
        <Form.Control
          type="text"
          aria-label="Name"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* description  */}
      <FloatingLabel controlId="floatingInput3" label="Description" className="mb-3">
        <Form.Control
          type="text"
          aria-label="Description"
          name="description"
          value={formInput.description}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Recipe Image" className="mb-3">
        <Form.Control
          type="url"
          aria-label="Enter an image url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* role  */}
      <FloatingLabel controlId="floatingTextarea" label="Ingredients" className="mb-3">
        <Form.Control
          as="textarea"
          aria-label="Ingredients"
          name="ingredients"
          value={formInput.ingredients}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingTextarea" label="PrepTime" className="mb-3">
        <Form.Control
          as="textarea"
          aria-label="PrepTime"
          name="prepTime"
          value={formInput.prepTime}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.id ? 'Update' : 'Add'} Recipe </Button>
    </Form>
  );
}

RecipeForm.propTypes = {
  obj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string,
    prepTime: PropTypes.string,
    id: PropTypes.number,
  }),
};

RecipeForm.defaultProps = {
  obj: initialState,
};

export default RecipeForm;
