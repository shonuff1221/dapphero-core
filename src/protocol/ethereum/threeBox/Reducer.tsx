import React, { FunctionComponent, useEffect, useState, useContext } from 'react'
import * as contexts from 'contexts'
import { useWeb3React } from '@web3-react/core'
import { logger } from 'logger/customLogger'
import { ThreeBoxProfileDataElement } from './ThreeBoxProfileDataElement'
import { ThreeBoxProfileImgElement } from './ThreeBoxProfileImgElement'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { getProfile: get3boxProfile } = require('3box/lib/api')

const ipfsRoot = 'https://cloudflare-ipfs.com/ipfs/'
interface ReducerProps {
  element: HTMLElement;
  info: any;
}

export const Reducer: FunctionComponent<ReducerProps> = ({ element, info }) => {
  // const injectedContext = useWeb3React()
  // const { address } = injectedContext
  const [ threeBoxProfile, setThreeBoxProfile ] = useState({
    name: null,
    location: null,
    emoji: null,
    job: null,
    description: null,
    website: null,
    image: [
      { contentUrl: { '/': null } },
    ],
  })

  const [ address, setAddress ] = useState(null)
  const ethereum = useContext(contexts.EthereumContext)
  const { signer } = ethereum

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const getAddress = async () => {
      try {
        setAddress(await (signer.getAddress()))
      } catch (error) {
        logger.log(`Error in retriving the users address`, error)
      }
    }
    if (signer) getAddress()
  }, [ signer ])

  useEffect(() => {
    const getProfile = async () => {
      try {
        // TODO: [DEV-97] How to we check the status of a request? When no Profile this 404's
        const profile = await get3boxProfile(address)
        setThreeBoxProfile(profile)
      } catch (error) {
        logger.log('You have no profile. ', error)
      }
    }
    if (address)getProfile()
  }, [ address ])

  switch (info?.properties[0]?.key) {
    case 'image': {
      const imageHash = threeBoxProfile?.image?.[0]?.contentUrl?.['/'] ?? null
      if (imageHash) {
        const imgSrc = `${ipfsRoot}${threeBoxProfile.image[0].contentUrl['/']}`
        return <ThreeBoxProfileImgElement element={element} imgSrc={imgSrc} />
      }
      return null
    }
    case 'name': {
      return <ThreeBoxProfileDataElement element={element} profileData={threeBoxProfile.name} />
    }
    case 'location': {
      return <ThreeBoxProfileDataElement element={element} profileData={threeBoxProfile.location} />
    }
    case 'emoji': {
      return <ThreeBoxProfileDataElement element={element} profileData={threeBoxProfile.emoji} />
    }
    case 'job': {
      return <ThreeBoxProfileDataElement element={element} profileData={threeBoxProfile.job} />
    }
    case 'description': {
      return <ThreeBoxProfileDataElement element={element} profileData={threeBoxProfile.description} />
    }
    case 'website': {
      return <ThreeBoxProfileDataElement element={element} profileData={threeBoxProfile.website} />
    }

    // TODO: [DEV-98] Build custom 3box profile ToolTip for Profiles
    // TODO: [DEV-99] Build element which swaps out Addresses for ThreeBox profile names
    default: {
      return null
    }
  }
}
