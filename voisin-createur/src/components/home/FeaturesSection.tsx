export default function FeaturesSection() {
  return (
    <section className="py-16 bg-surface relative border-b border-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="flex flex-col items-center group p-6 rounded-xl hover:bg-white/50 transition-colors">
            <div className="w-24 h-24 mb-6 relative flex items-center justify-center">
                <div className="absolute inset-0 bg-secondary/20 rounded-full transform group-hover:scale-110 transition-transform duration-300"></div>
                <span className="text-5xl relative z-10">🏺</span>
            </div>
            <h3 className="font-heading text-3xl text-text mb-3">Artisanat Local</h3>
            <p className="text-text/80 leading-relaxed">Des produits faits main avec passion par vos voisins.</p>
          </div>
          <div className="flex flex-col items-center group p-6 rounded-xl hover:bg-white/50 transition-colors">
            <div className="w-24 h-24 mb-6 relative flex items-center justify-center">
                <div className="absolute inset-0 bg-secondary/20 rounded-full transform group-hover:scale-110 transition-transform duration-300"></div>
                <span className="text-5xl relative z-10">💡</span>
            </div>
            <h3 className="font-heading text-3xl text-text mb-3">Créations Uniques</h3>
            <p className="text-text/80 leading-relaxed">Des pièces originales que vous ne trouverez nulle part ailleurs.</p>
          </div>
          <div className="flex flex-col items-center group p-6 rounded-xl hover:bg-white/50 transition-colors">
            <div className="w-24 h-24 mb-6 relative flex items-center justify-center">
                <div className="absolute inset-0 bg-secondary/20 rounded-full transform group-hover:scale-110 transition-transform duration-300"></div>
                <span className="text-5xl relative z-10">🤝</span>
            </div>
            <h3 className="font-heading text-3xl text-text mb-3">Rencontrez vos Voisins</h3>
            <p className="text-text/80 leading-relaxed">Échangez directement avec les créateurs de votre quartier.</p>
          </div>
        </div>
      </div>
    </section>
  )
}