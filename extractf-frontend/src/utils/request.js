import fetch from 'node-fetch';

export default async (link, projectName) => {
    let response = await fetch(link, {
        method: 'POST',
        body: projectName
    });

    let data = await response.json();

    return data;
}