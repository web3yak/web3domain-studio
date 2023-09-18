import { useRouter } from "next/router";
import React, { useEffect, useState } from 'react';
import { useJsonValue } from "../../../hooks/jsonData";
import { useURLValidation } from '../../../hooks/validate';

const UserProfilePage = () => {
    const [web3Url, setWeb3Url] = useState("");
    const [web2Url, setWeb2Url] = useState("");
    const [visitUrl, setVisitUrl] = useState('');
    const [webUrl, setWebUrl] = useState('');
    const [jsonData, setJsonData] = useState(null);
    const { validateURL } = useURLValidation();
    const { getValue } = useJsonValue(jsonData);
    const router = useRouter();
    const { visit } = router.query;
    const domain = visit ? String(visit).toLowerCase() : '';


    useEffect(() => {
        // Handle the username as needed
        console.log("Username:", domain);

        if (domain) {
            const randomNumber = Math.random();
            const url = "https://w3d.name/api/v1/index.php?domain=" + domain + "&" + randomNumber;
            console.log(url);
            const fetchData = async () => {
                try {
                    const response = await fetch(url);
                    const json = await response.json();
                    setJsonData(json); // Store the json response in the component's state
                    // setIsMainLoading(false);
                    console.log(json);
                } catch (error) {
                    console.log("error", error);
                }
            };

            fetchData();

        }

    }, [domain]);

    useEffect(() => {
        var web_url = '';
        var web3_url = '';

        if (jsonData?.records?.hasOwnProperty('51') && jsonData.records['51'].value !== '') {
            // If the '51' property exists in jsonData.records and its value is not empty
            // Set web3_url
            web3_url = jsonData.records['51'].value;
        }

        if (jsonData?.records?.hasOwnProperty('50') && jsonData.records['50'].value !== '') {
            // If the '50' property exists in jsonData.records and its value is not empty
            // Set web_url
            // console.log(jsonData);
            if (jsonData.records['50'].value != 'https://ipfs.io/ipfs/null') {
                if (jsonData.records['50'].value.startsWith("https://")) {
                    web_url = jsonData.records['50'].value;
                }
                else {
                    web_url = 'https://ipfs.io/ipfs/' + jsonData.records['50'].value;
                }
            }
        }


        if (web3_url !== '') {
            setWebUrl(web3_url);
            // console.log(web3_url);
        } else if (web_url !== '') {
            setWebUrl(web_url);
            // console.log(web_url);
        }
    }, [jsonData]);

    useEffect(() => {
        console.log(webUrl);
        window.location.assign(webUrl);
    }, [webUrl]);

    return (
        <div>
            {/* Render user profile or other content */}
            <h1>User Profile: {domain}</h1>
        </div>
    );
};

export default UserProfilePage;
