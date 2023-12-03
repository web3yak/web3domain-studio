import { ThemingProps } from '@chakra-ui/react'
import { polygon} from '@wagmi/chains'

export const SITE_NAME = 'Web3Domain Studio'
export const SITE_DESCRIPTION = 'Web3 Domain Provider'
export const SITE_URL = 'https://web3domain.org'

export const THEME_INITIAL_COLOR = 'system'
export const THEME_COLOR_SCHEME: ThemingProps['colorScheme'] = 'gray'
export const THEME_CONFIG = { initialColorMode: THEME_INITIAL_COLOR }

export const SOCIAL_MEDIUM = '' //Leave it blank if no values
export const SOCIAL_TWITTER = 'web3yak'
export const SOCIAL_GITHUB = 'web3yak'
export const SOCIAL_LINKEDIN = ''
export const SOCIAL_DISCORD = ''

export const NETWORKS = [polygon]; //polygon, filecoin, polygonMumbai
export const NETWORK_ERROR = "Unsupported Blockchain Network or Domain Name !" //Change network name as required

export const DOMAIN_TLD = 'yak' //primary domain name without dot (.)
export const DOMAIN_PRICE_ETH = '0.1' //price should be equal to contract or higher 
export const DOMAIN_IMAGE_URL = 'https://w3d.name/api/nft/yak.jpg' //Image path starts with ipfs:// or https://
export const DOMAIN_NETWORK_CHAIN = 137 //137 for polygon, 314 for filecoin, 80001 form mumbai
export const DOMAIN_DESCRIPTION = 'My Domain description goes here....'
export const DOMAIN_TYPE = "W3D" //W3D for polygon, FVM for Filecoin net
export const DOMAIN_TITLE = "Web3 Domain Search" //Title above the search input field. 
export const DOMAIN_PLACEHOLDER = "Search for a name" //Placeholder for search input field 

export const ADMIN_WALLET = "0x8D714B10B719c65B878F2Ed1436A964E11fA3271" //ETH wallet address 

export const NOTICE_TITLE = "Bulletin board"
export const NOTICE_NON_MEMBER = "Only the .yak domain holder can view bulletin board."