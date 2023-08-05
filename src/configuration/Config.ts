import { ThemingProps } from '@chakra-ui/react'
import { polygon, filecoin } from '@wagmi/chains'

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

export const INFURA_KEY = '817597f04d6941649c41255a1b10e815'
export const NETWORKS = [polygon, filecoin ]

export const DOMAIN = 'yak' //primary domain name without dot (.)
export const DOMAIN_PRICE_ETH = '1' //price should be equal to contract or higher 
export const DOMAIN_IMAGE_URL = 'https://ipfs.io/ipfs/bafkreia56vpemgrsnpyisbwfwwb44ktfk2uu4rgbwn65wflbx7e6qgx5eu' //Image path starts with ipfs:// or https://
export const DOMAIN_NETWORK_CHAIN = 'polygon' //network name where primary domain is minted