import { ThemingProps } from '@chakra-ui/react'
import { polygon} from '@wagmi/chains'

export const SITE_NAME = '0x Name Service'
export const SITE_DESCRIPTION = 'Hi0x © 2023'
export const SITE_URL = 'https://id.hi0x.net'

export const THEME_INITIAL_COLOR = 'system'
export const THEME_COLOR_SCHEME: ThemingProps['colorScheme'] = 'gray'
export const THEME_CONFIG = { initialColorMode: THEME_INITIAL_COLOR }

export const SOCIAL_MEDIUM = '' //Leave it blank if no values
export const SOCIAL_TWITTER = 'hi0xchat'
export const SOCIAL_GITHUB = 'hi0x'
export const SOCIAL_LINKEDIN = ''
export const SOCIAL_DISCORD = ''

export const NETWORKS = [polygon]; //polygon, filecoin, polygonMumbai
export const NETWORK_ERROR = "Change network to polygon !" //Change network name as required

export const DOMAIN_TLD = '0x' //primary domain name without dot (.)
export const DOMAIN_PRICE_ETH = '1' //price should be equal to contract or higher 
export const DOMAIN_IMAGE_URL = 'https://ipfs.io/ipfs/QmWfLXhfseaSkLrGm14my1TyrKRZ1H8W4DXtvpN9yWxYo9' //Image path starts with ipfs:// or https://
export const DOMAIN_NETWORK_CHAIN = 137 //137 for polygon, 314 for filecoin, 80001 form mumbai
export const DOMAIN_DESCRIPTION = 'Decentralized websites, business cards, personal ID'
export const DOMAIN_TYPE = "W3D" //W3D for polygon, FVM for Filecoin net
export const DOMAIN_TITLE = "Web3 Domain Search" //Title above the search input field. 
export const DOMAIN_PLACEHOLDER = "Search for Domain" //Placeholder for search input field 

export const ADMIN_WALLET = "0x6ec0Ce3333A7A2a37e38c656B46752F2a9fC8e19" //ETH wallet address 

export const NOTICE_TITLE = "Bulletin board"
export const NOTICE_NON_MEMBER = "Only the .0x domain holder can view bulletin board."

export const DOMAIN_BANNER = "https://i.imgur.com/pcV65kl.png" //290x80 size
