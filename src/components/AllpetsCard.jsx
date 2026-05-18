import React from 'react';

const AllpetsCard = ({ pet }) => {

    const{ petName, species, age, breed, location, description,
imageUrl } = pet;
    return (
        <div>
            <h2>{petName}</h2>
            <img 
            src={imageUrl} 
            alt={petName}
            height={400}
            width={400}
            
            />
            <p>Species: {species}</p>
            <p>Age: {age} years</p>
            <p>Breed: {breed}</p>
            <p>Location: {location}</p>
            <p>Description: {description}</p>
        </div>
    );
};

export default AllpetsCard;