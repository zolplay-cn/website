import { apiVersion, dataset, projectId, useCdn } from 'lib/sanity.api'
import { createClient } from 'next-sanity'
import 'server-only'

/**
 * Checks if it's safe to create a client instance, as `@sanity/client` will throw an error if `projectId` is false
 */
export const sanity = projectId ? createClient({ projectId, dataset, apiVersion, useCdn }) : null
