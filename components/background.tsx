export function Background() {
  return (
    <>
      <div className='fixed inset-0 -z-[1] bg-stone-100 dark:bg-stone-950' />
      <div className='fixed inset-0 w-full h-full pointer-events-none bg-[radial-gradient(#00000022_1px,transparent_1px)] dark:bg-[radial-gradient(#FFFFFF19_1px,transparent_1px)] bg-[size:16px_16px] md:bg-[size:32px_32px]' />

      <div className='mask-t pointer-events-none fixed hidden md:block inset-x-0 top-0 z-40 h-[100px] md:h-[88px] w-full select-none backdrop-blur-[1px]' />
    </>
  )
}
