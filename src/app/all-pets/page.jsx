import AllpetsCard from '@/components/AllpetsCard';
import React from 'react';

const AllPetPage = async () => {

    const res = await fetch("http://localhost:5000/pets");
    const data = await res.json();

    console.log(data);
    
    return (
        <div>
            <h1>All Pets</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    data.map(pet => <AllpetsCard key={pet._id} pet={pet} /> )
                }
            </div>
        </div>
    );
};

export default AllPetPage;