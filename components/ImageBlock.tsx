import { urlForImage } from '~/lib/sanity.image'
import Image from 'next/image'

export function ImageBlock({ value }: { value: any }) {
  return (
    <div className="relative w-full object-contain">
      <Image
        src={urlForImage(value).url()}
        alt=""
        className=" mx-auto max-h-[50vh] w-auto overflow-hidden rounded-2xl"
        width={value.dimensions.width}
        height={value.dimensions.height}
        placeholder="blur"
        blurDataURL={value.lqip}
      />
    </div>
  )
}
