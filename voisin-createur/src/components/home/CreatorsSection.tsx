export default function CreatorsSection() {
  return (
    <section className="py-20 bg-background border-b border-secondary/20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-heading text-5xl text-text mb-6">Nos Créateurs à l'honneur</h2>
          <div className="h-px w-full max-w-xs mx-auto bg-secondary/30"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group cursor-pointer">
            <div className="relative h-64 mb-4 overflow-hidden rounded-lg shadow-md">
              <img src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80" alt="Julie Bijoux" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h3 className="text-white font-heading text-2xl">Julie Bijoux</h3>
                <p className="text-white/90 text-sm">Créatrice de bijoux</p>
              </div>
            </div>
          </div>
          <div className="group cursor-pointer">
            <div className="relative h-64 mb-4 overflow-hidden rounded-lg shadow-md">
              <img src="https://images.unsplash.com/photo-1610555356070-d0efb6505f81?auto=format&fit=crop&w=600&q=80" alt="Pierre Bois&Co" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h3 className="text-white font-heading text-2xl">Pierre Bois&Co</h3>
                <p className="text-white/90 text-sm">Artisan Menuisier</p>
              </div>
            </div>
          </div>
          <div className="group cursor-pointer">
            <div className="relative h-64 mb-4 overflow-hidden rounded-lg shadow-md">
              <img src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=600&q=80" alt="Marie Céramique" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h3 className="text-white font-heading text-2xl">Marie Céramique</h3>
                <p className="text-white/90 text-sm">Céramiste</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}