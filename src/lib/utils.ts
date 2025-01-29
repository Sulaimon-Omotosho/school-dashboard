import { auth } from '@clerk/nextjs/server'

export async function getUserData() {
  const { sessionClaims, userId } = await auth()
  const role = (sessionClaims?.metadata as { role?: string })?.role
  return { role, userId }
}
