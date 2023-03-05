export function Rulers() {
  return (
    <>
      {/* Left line */}
      <div className="fixed top-0 left-1/2 h-screen w-px -translate-x-[287px] bg-gradient-to-b from-stone-200 dark:from-stone-700" />
      {/* Right line */}
      <div className="fixed bottom-0 right-1/2 h-screen w-px translate-x-[462px] bg-gradient-to-t from-stone-200 opacity-70 dark:from-stone-700" />
    </>
  )
}
