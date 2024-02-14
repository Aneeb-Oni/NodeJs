import * as crypto from 'crypto';

export function generateRandomToken(length: number = 32): string {
  // Generate random bytes of the specified length using crypto.randomBytes()
  const buffer = crypto.randomBytes(length);
  // Convert the generated random bytes to a base64 string representation
  const token = buffer.toString('base64');
  return token;

  // Output: A random token of 32 characters in base64 format
}
