# Web3Domain Studio
## _Become a Web3Domain provider_

[![N|Solid](https://web3domain.org/studio/wp-content/uploads/banner.jpg)](https://web3domain.org/studio/)


Your own website by selling subdomains. We will integrate the domain into our ecosystem, providing every domain user access to all of the features that Web3Domain offers.

## Features

* It is best option to earn for membership by letting user to obtain subdomain of your web3 primary domain.
* You earn as soon as domain minted.
* You can set the price, image, description for your subdomain yourself.
* You can also restrict not to be minted by public. Only you can mint it and transfer. Hence you can save commission fees too.
* All Web3Domains are NFTs. Which you can sell at opensea.io

## Installation

It requires [Node.js](https://nodejs.org/) to run.

Fork current repo and make it private so that the configuration and API keys are hidden from public view.

**Specifiy Environment variable. If local development , crate a file .env.local**

```sh
NEXT_PUBLIC_MATIC = "https://polygon-mainnet.g.alchemy.com/v2/......j4zryx"
NEXT_PUBLIC_ETH =  "https://eth-mainnet.g.alchemy.com/v2/......0bmp297MG7BjOKl"
NEXT_PUBLIC_FILECOIN = "https://api.node.glif.io/rpc/v1"
```

**Modify Web3Domain studio configuration file**
>Edit the file src\configuration\Config.tsx
>Change all the values as to your requirement. 
>Obtain INFURA or ALCHEMY api key.

```sh
import { ThemingProps } from '@chakra-ui/react'
import { polygon, filecoin, polygonMumbai } from '@wagmi/chains'

export const SITE_NAME = 'Web3Domain Studio'
export const SITE_DESCRIPTION = 'Web3 Domain Provider'
export const SITE_URL = 'https://web3domain.org'

export const THEME_INITIAL_COLOR = 'system'
export const THEME_COLOR_SCHEME: ThemingProps['colorScheme'] = 'gray'
export const THEME_CONFIG = { initialColorMode: THEME_INITIAL_COLOR }

export const SOCIAL_MEDIUM = '@web3yak'
export const SOCIAL_TWITTER = 'web3yak'
export const SOCIAL_GITHUB = 'web3yak'
export const SOCIAL_LINKEDIN = 'web3yak'
export const SOCIAL_DISCORD = 'web3yak'

export const INFURA_KEY = '3ff237d......480b271251407' // https://app.infura.io/dashboard
export const ALCHEMY_KEY = 'wdUDrk........CQWfO1InE7'; // https://dashboard.alchemy.com/
export const NETWORKS = [polygon]; //polygon, filecoin, polygonMumbai
export const NETWORK_ERROR = "Unsuppoted Blockchain Network or Domain Name !" //Change network name as required

export const DOMAIN_TLD = 'yak' //primary domain name without dot (.)
export const DOMAIN_PRICE_ETH = '0.1' //price should be equal to contract or higher 
export const DOMAIN_IMAGE_URL = 'https://w3d.name/api/nft/yak.jpg' //Image path starts with ipfs:// or https://
export const DOMAIN_NETWORK_CHAIN = 137 //137 for polygon, 314 for filecoin, 80001 form mumbai
export const DOMAIN_DESCRIPTION = 'My Domain description goes here....'
export const DOMAIN_TYPE = "W3D" //W3D for polygon, FVM for Filecoin net

```

**Change Logo**

* Overwrite the file logo.png & favicon.ico under `/public/` folder

**Deploy to your server**

```
npm i
```

## License
MIT
**Free Software**