import React, { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'

export const useDappHeroWeb3 = () => {
  const web3Context = useWeb3React()
  const { library, chainId, account, active } = web3Context

  const [ context, setContext ] = useState({
    lib: null,
    accounts: [],
    networkId: null,
    networkName: { network: null },
    connected: false,
  })

  useEffect(() => {
    setContext({
      lib: library,
      accounts: [ account ],
      networkId: chainId,
      networkName: library?.network?.name ?? null,
      connected: active,
    })
  }, [ library, chainId, account ]) // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag

  return context
}
