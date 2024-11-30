// src/App.jsx
import { useState, useEffect } from 'react';
import * as petService from './services/petService';
import PetList from './components/PetList';
import PetDetail from './components/PetDetails';
import PetForm from './components/PetForm';

const App = () => {
  const [petList, setPetList] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const pets = await petService.index();
        if (pets.error) { //?is this error coming from backend
          throw new Error(pets.error); //? create a new instance for Error class, recorded in frontend
        }
        setPetList(pets); 
      } catch (error) {
        console.log(error);
      }
      //! what is the different beyween error in throw new Error and catch error?
      //? 
      
    };
    fetchPets();
  }, []);

  const updateSelected = (pet) => {
    setSelected(pet)
  }

  const handleFormView = (pet) => {
    if (!pet.name) setSelected(null);
    setIsFormOpen(!isFormOpen);
    //bang operater will change the state to the oppsite of the current sate
  };

  const handleAddPet = async (formData) => {
    try {
      const newPet = await petService.create(formData);
      if (newPet.error) {
        throw new Error(newPet.error);
      }
      setPetList([newPet, ...petList]);
      setIsFormOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdatePet = async (formData, petId) => {
    try {
      const updatedPet = await petService.updatePet(formData, petId);

    // handle potential errors
    if (updatedPet.error) {
      throw new Error(updatedPet.error);
    }

    const updatedPetList = petList.map((pet) =>
      // If the id of the current pet is not the same as the updated pet's id, return the existing pet. If the id's match, instead return the updated pet.
      pet._id !== updatedPet._id ? pet : updatedPet
    );
      // Set petList state to this updated array
      setPetList(updatedPetList);
      // If we don't set selected to the updated pet object, the details page will reference outdated data until the page reloads.
      setSelected(updatedPet);
      setIsFormOpen(false);
    }catch(err) {
    }
  }

  const handleRemovePet = async (petId) => {
    try {
      const deletedPet = await petService.deletePet(petId);

      if (deletedPet.error) {
        throw new Error(deletedPet.error);
      }

      setPetList(petList.filter((pet) => pet._id !== deletedPet._id));
      setSelected(null);
      setIsFormOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <PetList 
        petList={petList} 
        updateSelected={updateSelected}
        handleFormView={handleFormView}
        isFormOpen={isFormOpen}
      />
      {isFormOpen ? (
      <PetForm 
      handleAddPet={handleAddPet} 
      selected={selected}
      handleUpdatePet ={handleUpdatePet}/>
      ) : (
        <PetDetail 
        selected={selected} 
        handleFormView={handleFormView} 
        handleRemovePet ={handleRemovePet}/>
      )}
    </>
  ) 
};

export default App;
