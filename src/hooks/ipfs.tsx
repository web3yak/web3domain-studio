// src/hooks/ipfs.tsx

import { useState } from 'react';

export async function generateJson(rawjson: any[], name: string): Promise<object | null> {
  try {
    const formData = new FormData();
    formData.append('data', JSON.stringify(rawjson)); // Append JSON data
    formData.append('name', name); // Append name string

    const url = `https://w3d.name/api/v1/json.php`;
    const response = await fetch(url, {
      method: 'POST',
      body: formData, // Use the FormData object
    });

 
   // console.log(response.ok);
    return response;
  } catch (error) {
    console.error('Error generating JSON:', error);
    return null;
  }
}

export async function generateImage(domainName: string, key: string): Promise<string | null> {
  try {
    const [domain,primary] = domainName.split('.'); // Split domainName into primary and domain

    const url = `http://localhost/blockchain/api/studio_nft.php?domain=${domain}&primary=${primary}&key=${key}`;
    console.log(url);
    const response = await fetch(url);
    const content = await response.text(); // Get the content as text

    return content;
  } catch (error) {
    console.error('Error generating image:', error);
    return null;
  }
}