import { ethers } from 'ethers'

export const convertUnits = (inputValueType, outputValueType, value) => {
  switch (inputValueType) {
  case ('wei'): {
    if (outputValueType === 'ether') return ethers.utils.formatEther(value)
    if (outputValueType === 'wei') return value
    break
  }
  case ('ether'): {
    if (outputValueType === 'wei') return ethers.utils.parseEther(value)
    if (outputValueType === 'ether') return value
    break
  }
  case ('address'): {
    if (outputValueType === 'short') return value.slice(0, 3) + '...' + value.slice(value.length - 3)
    if (outputValueType === 'full') return value
    break
  }
  case ('bytes32'): {
    if (outputValueType === 'ascii') return ethers.utils.parseBytes32String(value)
    if (outputValueType === 'bytes32') return value
    break
  }
  case ('ascii'): {
    if (outputValueType === 'bytes32') return ethers.utils.formatBytes32String(value)
    if (outputValueType === 'ascii') return value
    break
  }
  default:
    throw new Error(`You attempted to convert units using inputType: ${inputValueType} which is not supported`)
  }
  throw new Error(`You attempted to convert units using outputType: ${outputValueType} which is not supported`)
}
