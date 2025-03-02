import addresses from './eligible.txt?raw';

const whitelistedAddresses = new Set(
  addresses
    .split('\n')
    .map(addr => addr.trim()) // Trim any whitespace
    .filter(addr => addr) // Remove empty lines
    .map(addr => addr.toLowerCase())
);

export const isWhitelisted = (address: string): boolean => {
  return whitelistedAddresses.has(address.toLowerCase());
};