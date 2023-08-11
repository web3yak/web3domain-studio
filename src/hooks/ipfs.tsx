// src/hooks/ipfs.tsx

import { useState } from 'react';

export async function generateJson(rawjson: any[], name: string): Promise<boolean> {
  try {
    //const url = `https://w3d.name/api/v1/json.php`;
    const url = 'http://localhost/blockchain/w3d_json_api/v1/json.php';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rawjson, name }),
    });
    console.log(response);
    return response.ok;
  } catch (error) {
    console.error('Error generating JSON:', error);
    return false;
  }
}

export async function getIpfsCid(name: string): Promise<string | null> {
  try {
    //const url = `https://w3d.name/api/json/${name}_cid.txt`;
    const url = `http://localhost/blockchain/w3d_json_api/json/${name}_cid.txt`;

    const response = await fetch(url);
    if (response.ok) {
      const content = await response.text();
      return content;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching IPFS CID:', error);
    return null;
  }
}
