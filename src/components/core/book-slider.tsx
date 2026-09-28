import Image from "next/image";
import HTMLFlipBook from "react-pageflip";

function Component() {
  const pokemonData = [
    {
      id: "006",
      image: `/sitting.svg`,
      title: "The Prologue",
      description: `To be specific I came from an engineers family, i was inspired about physics and astronomy since childhood. Sorting out my basics and learning the fundamentals until my SSC. but at the edge of 2019, I was able to discover the magic of programming. Soon after I realized okay, This is who I want to become. And The world itself gave me freedom for it afterwards. how? Remember the epidemic of Covid? which rushed in at late 2019, and i was able to spend 6 months straight to learn Javascript, explored Go, Python and many more. With that much in my hand i chose to go and study Computer Science. right before becoming an Undergraduate, I got opportunity to start my career as a Software Engineer.`,
    },
    {
      id: "025",
      image: `/reading.svg`,
      title: "Beginning of my Journey",
      description: (
        <>
          With already 4 years of self thought programming, I gained signifant
          understanding over the concepts and the possibilities in my hand, but
          i was lacking professional experience. <br />
          In February of 2026, I was selected for an internship program in
          Business Automation Ltd. Where i was able to get a deep understanding
          of the fundamentals of Real World Software Engineering. from Planning
          to Development and Testing to Production. This four month i was
          constantly getting hold on the physchology of softwares.
          <br />
          <br />
          After the internship, I took some time off to get myself prepared
          while creating a personal portfolio to prepare myself for the next
          step of my career.
        </>
      ),
    },
    {
      id: "027",
      image: `/contri.svg`,
      title: "The Mirror point",
      // title: "The Journey Continues",
      description: (
        <>
          In 2025, I decided to join Sparktech Agency. In no time my skills were
          recognized flawlessly. My communication skills got better, I started
          taking responsibilites of projects on my own. From Requirement
          collection to Deployment. I have been contributing to everything.
          Leading my team to be recognzied as the best multiple times while I
          have been learning to expand my skills more depending on the trend and
          the needs of the businesses i’ve had been interacting with.
        </>
      ),
    },
    {
      id: "028",
      image: `/robo.svg`,
      title: "The Journey Continues",
      // title: "The Journey Continues",
      description: (
        <>
          Just Like that , All of a sudden AI came out. While some people
          started to play victim, I switched my focus to AI driven development,
          Keeping the security matters in mind i have been coding alongside AI
          until then.
          <br />
          Not only Applications anymore. Soon as I started to see the impact and
          requirement of my clients towards AI, I have been learning AI
          engineering ever since.
          <br />
          <br />
          And Just this year, at late 2026. I was promoted to the position of
          Senior Executive of my team. And Im still helping my clients grow with
          a happy face along my journey..
        </>
      ),
    },
  ];

  return (
    <HTMLFlipBook
      width={370}
      height={500}
      drawShadow={true}
      showCover={true}
      size="stretch"
      className={""}
      style={{}}
      startPage={0}
      minWidth={0}
      maxWidth={370}
      minHeight={0}
      maxHeight={500}
      flippingTime={1000}
      usePortrait={false}
      startZIndex={0}
      autoSize={true}
      maxShadowOpacity={0}
      mobileScrollSupport={true}
      clickEventForward={true}
      useMouseEvents={true}
      swipeDistance={0}
      showPageCorners={true}
      disableFlipByClick={false}
    >
      <div className="bg-linear-to-b from-[#7D9DC9] to-foreground rounded-lg">
        <Image
          src={`/noteverde.webp`}
          height={1370}
          width={1024}
          className="w-full h-full object-cover absolute top-0 left-0 rounded-lg mix-blend-overlay opacity-50"
          alt="Background"
        />
        <div className="page-content cover h-full w-full relative">
          <h2 className="text-background font-black text-2xl pt-6 font-serif text-center">
            How My Work <br /> Impacts the World
          </h2>
          <p className="text-sm p-6 w-full text-center text-muted-foreground pt-2 tracking-[0.5rem] font-extralight font-sans">
            Raven
          </p>
          <Image
            src="/astro.svg"
            alt="Astro"
            className="pokemon-logo -bottom-3.5! w-2/3! left-1/2 -translate-x-1/2 absolute"
            height={500}
            width={500}
          />
        </div>
      </div>
      {pokemonData.map((pokemon) => (
        <div
          className="page bg-foreground/70 text-background rounded-lg p-4"
          key={pokemon.id}
        >
          <Image
            src={`/noteverde.webp`}
            height={1370}
            width={1024}
            className="w-full h-full object-cover absolute top-0 left-0 rounded-lg mix-blend-overlay opacity-30"
            alt={pokemon.title}
          />
          <div className="page-content">
            <Image
              src={pokemon.image}
              height={500}
              width={500}
              className="w-full h-full object-cover size-28! mx-auto"
              alt={pokemon.title}
            />
            <div className="pokemon-container pt-4">
              <div className="pokemon-info">
                <h3 className="text-lg font-bold">{pokemon.title}</h3>
                <p className="pokemon-description font-serif text-sm tracking-wide">
                  {pokemon.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="bg-linear-to-b from-[#7D9DC9] to-foreground rounded-lg">
        <Image
          src={`/noteverde.webp`}
          height={1370}
          width={1024}
          className="w-full h-full object-cover absolute top-0 left-0 rounded-lg mix-blend-overlay opacity-50"
          alt="Background"
        />
        <div className="page-content cover h-full w-full relative flex flex-col pb-12 items-center justify-center">
          <h2 className="text-background font-black text-sm pt-6 font-serif text-center">
            Thank you for <br /> reading my story
          </h2>
          <p className="text-sm p-6 w-full text-center text-muted-foreground pt-2 tracking-[0.5rem] font-extralight font-sans">
            Raven
          </p>
          <Image
            src="/sofa.svg"
            alt="Sitting in sofa"
            className="pokemon-logo -bottom-3.5! w-2/3! left-1/2 -translate-x-1/2 absolute"
            height={500}
            width={500}
          />
        </div>
      </div>
    </HTMLFlipBook>
  );
}

export default Component;
