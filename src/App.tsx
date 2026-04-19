import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [matches, setMatches] = useState([]);
  const [count, setCount] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
     const x = await fetch("https://api.openligadb.de/getmatchdata/bl1")
     const data = await x.json();
     setMatches(data);
     setCount(true);
     console.log(data); 
    }
    fetchData(); 
  }, []);
  if (!count) {
    return (
      <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto'></div>
          <h1 className='text-2xl font-bold text-gray-700 mt-4'>Cargando...</h1>
        </div>
      </div>
    );
  }
  return (
    <div className='min-h-screen bg-gray-50 flex flex-col'>
      {/* Header */}
      <header className='bg-black text-white py-4 shadow-md'>
        <div className='container mx-auto flex items-center justify-center gap-3'>
          <h1 className='text-3xl font-bold'>GoalStream</h1>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8">
            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM6.262 6.072a8.25 8.25 0 1 0 10.562-.766 4.5 4.5 0 0 1-1.318 1.357L14.25 7.5l.165.33a.809.809 0 0 1-1.086 1.085l-.604-.302a1.125 1.125 0 0 0-1.298.21l-.132.131c-.439.44-.439 1.152 0 1.591l.296.296c.256.257.622.374.98.314l1.17-.195c.323-.054.654.036.905.245l1.33 1.108c.32.267.46.694.358 1.1a8.7 8.7 0 0 1-2.288 4.04l-.723.724a1.125 1.125 0 0 1-1.298.21l-.153-.076a1.125 1.125 0 0 1-.622-1.006v-1.089c0-.298-.119-.585-.33-.796l-1.347-1.347a1.125 1.125 0 0 1-.21-1.298L9.75 12l-1.64-1.64a6 6 0 0 1-1.676-3.257l-.172-1.03Z" clipRule="evenodd" />
          </svg>
        </div>
      </header>

      {/* Main Content */}
      <main className='container mx-auto py-8 flex-grow'>
        <div className='bg-white shadow-lg rounded-lg overflow-hidden'>
          <table className='w-full table-auto'>
            <thead className='bg-gray-200'>
              <tr>
                <th className='px-4 py-3 text-left text-sm font-semibold text-gray-700'>Local</th>
                <th className='px-4 py-3 text-center text-sm font-semibold text-gray-700'>vs</th>
                <th className='px-4 py-3 text-left text-sm font-semibold text-gray-700'>Visitante</th>
                <th className='px-4 py-3 text-center text-sm font-semibold text-gray-700'>Resultado</th>
                <th className='px-4 py-3 text-center text-sm font-semibold text-gray-700'>Estado</th>
              </tr>
            </thead>
            <tbody>
              {matches.map((m: any) => (
                <tr key={m.matchID} className='hover:bg-gray-50 border-b border-gray-200'>
                  <td className='px-4 py-3 text-sm text-gray-900'>{m.team1.teamName}</td>
                  <td className='px-4 py-3 text-center text-sm text-gray-500'>vs</td>
                  <td className='px-4 py-3 text-sm text-gray-900'>{m.team2.teamName}</td>
                  <td className='px-4 py-3 text-center text-sm font-medium text-gray-900'>
                    {m.matchResults?.[0]?.pointsTeam1 ?? "-"} - {m.matchResults?.[0]?.pointsTeam2 ?? "-"}
                  </td>
                  <td className='px-4 py-3 text-center text-sm'>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${m.matchIsFinished ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {m.matchIsFinished ? "Finalizado" : "En juego"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Footer */}
      <footer className='bg-gray-800 text-white py-4'>
        <div className='container mx-auto text-center'>
          <p className='text-sm'>© 2026 GoalStream. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
