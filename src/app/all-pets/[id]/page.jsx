import React from 'react';

const PetDetailsPage =async ({params}) => {
    const { id } = await params;
    console.log("Pet ID:", id);

    const res = await fetch(`http://localhost:5000/pets/${id}`);
    const pet = await res.json();
    console.log("Pet Details:", pet);
    

    return (
        <div>
            <h1>Pet Details</h1>
            <p>This is the details page for a specific pet.</p> 
        </div>
    );
};

export default PetDetailsPage;