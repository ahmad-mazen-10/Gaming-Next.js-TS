import GridContainer from '@/app/components/defaults/GridContainer';
import Filters from '@/app/components/Filters';
import Heading from '@/app/components/Heading';
import { APIURL, KEY } from '@/app/constants';
import React from 'react';

async function page() {
    const data = await fetch(`${APIURL}genres?key=${KEY}`).then((res) => res.json());
    const generes = data.results.slice(0, 15);
    return (
        <GridContainer cols={11}>
            <div className=" mt-10 relative flex flex-col gap-5">
                <Heading text="Games From Genres" />
                <Filters generes={generes} />
            </div>
        </GridContainer>
    );
};

export default page;

