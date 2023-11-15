import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleRecipe } from '../../../api/recipeData';
import RecipeForm from '../../../components/Forms/RecipeForm';

export default function EditRecipe() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleRecipe(id).then(setEditItem);
  }, [id]);
  console.warn(editItem);
  return (<RecipeForm obj={editItem} />);
}
