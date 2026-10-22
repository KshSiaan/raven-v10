export default function Home() {
  return (
    <>
      <div className="grid grid-cols-2 h-full w-full">
        {/* <div
        className="h-full w-full bg-background bg-blend-lighten bg-center bg-no-repeat z-40"
        style={{ backgroundImage: "url('/me.webp')" }}
      ></div> */}
      </div>
      <div className="fixed left-1/2 -translate-x-1/2 lg:translate-x-auto lg:left-6 bottom-16 w-full lg:bottom-6">
        <h1 className="text-5xl lg:text-8xl font-heading italic font-extralight text-primary leading-none text-center">
          Raven
        </h1>
        <p className="text-muted-foreground italic w-full p-4 lg:p-0 text-xs lg:text-base text-center lg:text-left">
          The mind behind the businesses, the soul behind the art, and the heart
          behind the music.
        </p>
      </div>
    </>
  );
}
