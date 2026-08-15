import type {ValidationContext} from 'sanity'

/**
 * Async uniqueness check that excludes both the published and draft IDs of the
 * current document (avoids self-match after the first draft save).
 */
export function uniqueFieldAmongType(
  documentType: string,
  fieldName: string,
  errorMessage = `${fieldName} must be unique`,
) {
  return async (value: string | undefined, context: ValidationContext) => {
    if (!value) return true

    const client = context.getClient({apiVersion: '2025-10-15'})
    const rawId = context.document?._id
    if (!rawId) return true

    const publishedId = rawId.replace(/^drafts\./, '')
    const draftId = `drafts.${publishedId}`

    const existing = await client.fetch<number>(
      `count(*[_type == $type && ${fieldName} == $value && !(_id in [$publishedId, $draftId])])`,
      {type: documentType, value, publishedId, draftId},
    )

    return existing === 0 || errorMessage
  }
}

/** Uniqueness helper for the conventional `key` field on shared documents. */
export function uniqueKeyAmongType(documentType: string) {
  return uniqueFieldAmongType(documentType, 'key', 'Key must be unique')
}
