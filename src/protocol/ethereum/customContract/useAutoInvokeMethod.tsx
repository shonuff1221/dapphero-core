import { useEffect } from 'react'

export const useAutoInvokeMethod = ({
  info,
  autoInvokeKey,
  autoClearKey,
  readEnabled,
  readContract,
  isTransaction,
  handleRunMethod,
  readChainId,
  POLLING_INTERVAL,
  writeAddress,
  parametersValues,
  preventAutoInvoke,
  setAutoInterval,
}): void => {

  useEffect(() => {
    if (!preventAutoInvoke && autoInvokeKey && readChainId === info?.contract?.networkId) {
      const { value: autoInvokeValue } = autoInvokeKey || { value: false }
      const autoClearValue = autoClearKey?.value || false

      if (autoInvokeValue === 'true' && !isTransaction) {
        const intervalId = setInterval(() => handleRunMethod(null, autoClearValue, true), POLLING_INTERVAL)
        setAutoInterval(intervalId)
        return (): void => clearInterval(intervalId)
      }
    }
  }, [ readEnabled, readContract, writeAddress, parametersValues, preventAutoInvoke ])

  return null
}