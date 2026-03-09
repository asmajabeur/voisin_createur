interface HeroSectionProps {
  title: string
  subtitle: string
  backgroundImage?: "string"
  children?: React.ReactNode
}

export default function HeroSection({ title, subtitle, backgroundImage, children }: HeroSectionProps) {
  return (
    <section className={`relative ${children ? 'flex-grow flex items-center justify-center' : 'h-[500px] flex items-center justify-center'} overflow-hidden`}>
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('${backgroundImage || "/entete.jpg"}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-12 flex flex-col items-center text-center">
        <h1 className="font-heading text-5xl md:text-7xl text-white mb-6 drop-shadow-lg transform -rotate-2">
          {title}
        </h1>
        {!children && <div className="h-1 w-32 bg-secondary mx-auto mb-8 rounded-full"></div>}
        <p className="text-xl md:text-3xl text-gray-100 mb-10 font-light tracking-wide drop-shadow-md">
          {subtitle}
        </p>
        {children}
      </div>
    </section>
  )
}