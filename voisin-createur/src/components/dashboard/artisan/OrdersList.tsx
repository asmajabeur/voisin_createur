export default function OrdersList() {
  return (
    <div className="flex-1 space-y-4">
      {/* Commande Entête (Fermée) */}
      <div className="cmd-item-closed">
        <div className="flex items-center gap-4 flex-1">
          <span className="font-bold text-lg text-[#1A1A1A]">CMD#1023</span>
          <span className="font-bold text-lg text-[#1A1A1A]">Marie-Laure T.</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="badge-status-prep">Statut: En Préparation</span>
          <span className="text-[#DEB887] transform rotate-180">▼</span>
        </div>
      </div>

      {/* Commande Étendue (Ouverte) */}
      <div className="cmd-item-open">
        <div className="p-4 border-b border-[#DEB887]/30 flex items-center justify-between cursor-pointer">
          <div className="flex items-center gap-4 flex-1">
            <span className="font-bold text-lg text-[#1A1A1A]">CMD#1022</span>
            <span className="font-bold text-lg text-[#1A1A1A]">Thomas G.</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="badge-status-sent">Statut: Envoyé</span>
            <span className="text-[#DEB887]">▲</span>
          </div>
        </div>
        {/* Contenu de la commande ouverte */}
        <div className="p-5 ">
          <h4 className="font-sans font-bold text-[#1A1A1A] mb-1">Selectin a nonde détails</h4>
          <p className="font-bold text-[#1A1A1A] mb-2">Customer info:</p>
          <p className="text-[15px] text-[#333333] font-medium">
            <span className="font-bold mr-1">Détails:</span>
            Chêne, Marqueterie, Finition Huilée.
          </p>
        </div>
      </div>

      {/* Commande Entête (Fermée) */}
      <div className="cmd-item-closed">
        <div className="flex items-center gap-4 flex-1">
          <span className="font-bold text-lg text-[#1A1A1A]">CMD#1022</span>
          <span className="font-bold text-lg text-[#1A1A1A]">Thomas G.</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="badge-status-sent">Statut: Envoyé</span>
          <span className="text-[#DEB887] transform rotate-180">▼</span>
        </div>
      </div>
    </div>
  )
}
