import { ThemingProps } from '@chakra-ui/react'
import { polygon, filecoin, polygonMumbai } from '@wagmi/chains'

export const SITE_NAME = 'Web3Domain Studio'
export const SITE_DESCRIPTION = 'Web3 Domain Provider'
export const SITE_URL = 'https://web3domain.org'

export const THEME_INITIAL_COLOR = 'system'
export const THEME_COLOR_SCHEME: ThemingProps['colorScheme'] = 'gray'
export const THEME_CONFIG = { initialColorMode: THEME_INITIAL_COLOR }

export const SOCIAL_MEDIUM = 'web3yak'
export const SOCIAL_TWITTER = 'web3yak'
export const SOCIAL_GITHUB = 'web3yak'
export const SOCIAL_LINKEDIN = 'web3yak'
export const SOCIAL_DISCORD = 'web3yak'

export const INFURA_KEY = '3ff237d4c4d14dc8b3b480b271251407' //3ff................198
export const ALCHEMY_KEY = 'wdUDrkg1zZhHlYC-59w5qJCQWfO1InE7'; //wdUDrk..........O1InE7
export const NETWORKS = [polygon, filecoin, polygonMumbai ]; //polygon, filecoin, polygonMumbai
export const NETWORK_ERROR = "Unsuppoted Blockchain Network or Domain Name !" //Change network name as required

export const DOMAIN_TLD = 'yak' //primary domain name without dot (.)
export const DOMAIN_PRICE_ETH = '0.1' //price should be equal to contract or higher 
export const DOMAIN_IMAGE_URL = 'https://bafybeih7ff4qpnrasx44hms5qvt4wapk6lqh2prnhgj7myub4ozvc5rksm.ipfs.nftstorage.link/' //Image path starts with ipfs:// or https://
export const DOMAIN_NETWORK_CHAIN = 137 //137 for polygon, 314 for filecoin, 80001 form mumbai
export const DOMAIN_DESCRIPTION = 'My Domain description goes here....'
export const DOMAIN_TYPE = "W3D" //W3D for polygon, FVM for Filecoin net

