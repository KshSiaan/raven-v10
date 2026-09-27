export default function Home() {
  return (
    <>
      <div className="grid grid-cols-2 h-full w-full">
        {/* <div
        className="h-full w-full bg-background bg-blend-lighten bg-center bg-no-repeat z-40"
        style={{ backgroundImage: "url('/me.webp')" }}
      ></div> */}
      </div>
      <div className="fixed left-6 bottom-6">
        <h1 className="text-[10rem] font-heading italic font-extralight text-primary leading-none">
          Raven
        </h1>
        <p className="text-muted-foreground italic">
          The mind behind the code, the soul behind the art, and the heart
          behind the music.
        </p>
      </div>
    </>
  );
}
