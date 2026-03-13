export default function OrdersList() {
  return (
    <div className="flex-1 space-y-4">
      {/* Commande Entête (Fermée) */}
      <div className="bg-surface border border-border/60 rounded-lg p-4 shadow-sm flex items-center justify-between cursor-pointer transition-colors hover:bg-background/50">
        <div className="flex items-center gap-4 flex-1">
          <span className="font-bold text-lg text-text">CMD#1023</span>
          <span className="font-bold text-lg text-text">Marie-Laure T.</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="bg-[#E6DBAD] text-[#5c4f1c] font-bold text-xs uppercase px-3 py-1 rounded">Statut: En Préparation</span>
          <span className="text-border transform rotate-180">▼</span>
        </div>
      </div>

      {/* Commande Étendue (Ouverte) */}
      <div className="bg-surface border border-border/60 rounded-lg overflow-hidden shadow-sm">
        <div className="p-4 border-b border-border/30 flex items-center justify-between cursor-pointer">
          <div className="flex items-center gap-4 flex-1">
            <span className="font-bold text-lg text-text">CMD#1022</span>
            <span className="font-bold text-lg text-text">Thomas G.</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-[#B1D8C1] text-[#2c4e36] font-bold text-xs uppercase px-3 py-1 rounded">Statut: Envoyé</span>
            <span className="text-border">▲</span>
          </div>
        </div>
        {/* Contenu de la commande ouverte */}
        <div className="p-5 ">
          <h4 className="font-sans font-bold text-text mb-1">Détails de la commande</h4>
          <p className="font-bold text-text mb-2">Customer info:</p>
          <p className="text-[15px] text-text-muted font-medium">
            <span className="font-bold mr-1">Détails:</span>
            Chêne, Marqueterie, Finition Huilée.
          </p>
        </div>
      </div>

      {/* Commande Entête (Fermée) */}
      <div className="bg-surface border border-border/60 rounded-lg p-4 shadow-sm flex items-center justify-between cursor-pointer transition-colors hover:bg-background/50">
        <div className="flex items-center gap-4 flex-1">
          <span className="font-bold text-lg text-text">CMD#1022</span>
          <span className="font-bold text-lg text-text">Thomas G.</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="bg-[#B1D8C1] text-[#2c4e36] font-bold text-xs uppercase px-3 py-1 rounded">Statut: Envoyé</span>
          <span className="text-border transform rotate-180">▼</span>
        </div>
      </div>
    </div>
  )
}
