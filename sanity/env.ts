export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-08-28'

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'myblogs'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'jz5d0jhu'

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
