export function Background() {
  return (
    <>
      <div className='fixed inset-0 -z-[1] bg-stone-100 dark:bg-stone-950' />
      <div className='fixed inset-0 w-full h-full pointer-events-none bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#FFFFFF10_1px,transparent_1px),linear-gradient(to_bottom,#FFFFFF10_1px,transparent_1px)] bg-[size:35px_35px] md:bg-[size:70px_70px]' />

      <div className='mask-t pointer-events-none fixed hidden md:block inset-x-0 top-0 z-30 h-[100px] md:h-[88px] w-full select-none backdrop-blur-[1px]' />
    </>
  )
}
