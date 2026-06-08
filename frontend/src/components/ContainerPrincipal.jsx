export default function ContainerPrincipal({ children }) {
  return (
    <div className="bg-[#FDFCFB] min-h-screen">
      {children}
    </div>
  )
}

export function ConteudoCard({ children }) {
  return (
    <div className="bg-white bg-opacity-70 backdrop-blur-[12px] border border-[#E0DDD8] border-opacity-60 rounded-[12px] p-8 shadow-sm">
      {children}
    </div>
  )
}

export function ContainerCenter({ children }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {children}
    </div>
  )
}
