import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const page = async () => {

    const session = await auth.api.getSession({
        headers : await headers()
    });

    const user = session?.user || null;
    console.log(session);

    const res = await fetch(`http://localhost:5000/adoption-requests/${user?.id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data);
    return (
        <div>
            <h1>My request </h1>
            <p>{data.message}</p>   
        </div>
    );
};

export default page;