import imageUrlBuilder, { type SanityImageSource } from "@sanity/image-url"
import { sanityClient } from "./client"

const builder = imageUrlBuilder(sanityClient)

/**
 * Returns an image URL builder pre-seeded with the project credentials.
 *
 * @example
 * urlFor(image).width(800).auto('format').url()
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}
