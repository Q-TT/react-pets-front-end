// src/components/PetList.jsx

const PetList = (props) => {
    console.log(props.petList)
    const pets = props.petList.map((pet) => (
        <a key={pet._id} onClick={() => props.updateSelected(pet)}>
            <li>{pet.name}</li>
        </a>
    ))


    return (
        <div>
            <h1>Pet List</h1>
            {!props.petList.length ? <h2> no Pets Yet!</h2> : <ul>{pets} </ul>
            }
            <button onClick={props.handleFormView}>
                {props.isFormOpen ? 'Close Form' : 'New Pet'}
            </button>
        </div>
    );
  };
  
export default PetList;
