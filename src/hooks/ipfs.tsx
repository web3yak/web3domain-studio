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