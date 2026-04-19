import { useEffect, useState } from 'react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import './App.css';

function App() {
  const [matches, setMatches] = useState<any[]>([])
  const [loaded, setLoaded] = useState<boolean>(false)
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  useEffect(() => {
      if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }
      gsap.from(".app-page", {
    y: 100,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: ".app-page",
      start: "top 80%", // cuando aparece en pantalla
      toggleActions: "play none none none"
    }
  });
    const fetchData = async () => {
      const x = await fetch('https://api.openligadb.de/getmatchdata/bl1')
      const data = await x.json()
      setMatches(data)
      setLoaded(true)
    }
    fetchData()
  }, [])
  const soccerBallIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="ball-svg" aria-hidden="true">
      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM6.262 6.072a8.25 8.25 0 1 0 10.562-.766 4.5 4.5 0 0 1-1.318 1.357L14.25 7.5l.165.33a.809.809 0 0 1-1.086 1.085l-.604-.302a1.125 1.125 0 0 0-1.298.21l-.132.131c-.439.44-.439 1.152 0 1.591l.296.296c.256.257.622.374.98.314l1.17-.195c.323-.054.654.036.905.245l1.33 1.108c.32.267.46.694.358 1.1a8.7 8.7 0 0 1-2.288 4.04l-.723.724a1.125 1.125 0 0 1-1.298.21l-.153-.076a1.125 1.125 0 0 1-.622-1.006v-1.089c0-.298-.119-.585-.33-.796l-1.347-1.347a1.125 1.125 0 0 1-.21-1.298L9.75 12l-1.64-1.64a6 6 0 0 1-1.676-3.257l-.172-1.03Z" clipRule="evenodd" />
    </svg>
  )

  if (!loaded) {
    return (
      <div className="loading-screen min-h-screen bg-slate-950/90 px-4 py-10">
        <div className="loading-card shadow-2xl ring-1 ring-white/10">
          <div className="loading-spinner" />
          <h1 className="loading-title">
            {soccerBallIcon}
            Cargando...
          </h1>
          <p className="loading-subtitle">Cargando resultados en vivo con estilo moderno y responsive.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="app-page">
      <header className="site-header">
        <div className="container header-inner flex items-center justify-between gap-4 py-5">
          <div className="brand inline-flex items-center gap-4">
            {soccerBallIcon}
            <div>
              <h1 className="brand-title">GoalStream</h1>
            </div>
          </div>

          <button
            className="hamburger-btn flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10 transition hover:-translate-y-0.5 hover:bg-sky-500/15 sm:h-10 sm:w-10"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>

          <nav className={`nav-menu ${menuOpen ? 'open' : ''} rounded-2xl bg-slate-900/95 p-3 shadow-2xl ring-1 ring-white/10`}>
            <a className="nav-link block px-4 py-3 rounded-xl text-sm font-semibold transition hover:bg-sky-500/15" href="https://github.com/perejilinformatico" target="_blank" rel="noreferrer">
              Más proyectos
            </a>
          </nav>
        </div>
      </header>

      <main className="container main-content px-2 sm:px-0">
        <section className="hero-panel rounded-[28px] border border-slate-700/60 bg-slate-900/90 p-8 shadow-2xl sm:p-10">
          <div>
            <p className="eyebrow uppercase tracking-[0.22em] text-sky-300 text-sm">Dashboard deportivo</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight text-white sm:text-5xl">Resultados de la Bundesliga con diseño responsive</h2>
            <p className="hero-copy mt-5 max-w-3xl text-slate-300 leading-8">
              Visualiza los encuentros con un formato limpio y adaptado a móviles, tablets y escritorio.
            </p>
          </div>
        </section>

        <section className="table-wrapper mt-8">
          <div className="match-card rounded-[28px] border border-slate-700/50 bg-slate-950/95 p-6 shadow-2xl">
            <div className="match-header flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <h3 className="text-xl font-semibold text-white">Últimos partidos</h3>
              <span className="match-label text-slate-400 text-sm">Datos actualizados automáticamente</span>
            </div>
            <div className="overflow-x-auto">
              <table className="match-table">
                <thead>
                  <tr>
                    <th>Local</th>
                    <th>vs</th>
                    <th>Visitante</th>
                    <th>Resultado</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {matches.map((m: any) => (
                    <tr key={m.matchID}>
                      <td>{m.team1.teamName}</td>
                      <td className="table-vs">vs</td>
                      <td>{m.team2.teamName}</td>
                      <td className="table-result">
                        {m.matchResults?.[0]?.pointsTeam1 ?? '-'} - {m.matchResults?.[0]?.pointsTeam2 ?? '-'}
                      </td>
                      <td>
                        <span className={`score-chip ${m.matchIsFinished ? 'finished' : 'live'}`}>
                          {m.matchIsFinished ? 'Finalizado' : 'En juego'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© 2026 GoalStream. Todos los derechos reservados.</p>
      </footer>
    </div>
  )
}

export default App
