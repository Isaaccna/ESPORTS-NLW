import './styles/main.css'
import * as Dialog from '@radix-ui/react-dialog'
import { useEffect, useState } from 'react'
import logoImg from './assets/logo.svg'
import { GameBanner } from './components /GameBanner'
import { CreateAdBanner } from './components /CreateAdBanner'
import { CreateAdModal } from './components /Form/CreatAdModal'
import axios from 'axios'

//Inteface to show what properties will be added to the array of 'useState' hook
interface Game {
  bannerUrl: string
  id: string
  title: string
  _count: {
    ads: number
  }
}
function App() {
  // useEffect to not allow the page to fetch the api every time the state is changed
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    axios('http://localhost:3000/games')
      .then(response => {
        setGames(response.data)
      })
  }, [])
  return (
    <div className="m-w-[1344px] mx-auto flex flex-col items-center m-20">
      <img src={logoImg} />

      <h1 className="text-6xl text-white  font-black mt-20 mb-16">
        Seu{' '}
        <span className="bg-nlwGradient bg-clip-text text-transparent ">
          duo
        </span>{' '}
        está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mb-8">
        {/* render a 'GameBanner' component for each game in the data  */}
        {games.map(game => {
          return (
            <GameBanner
              // react requires a Key - an unique value of each data
              key={game.id}
              bannerUrl={game.bannerUrl}
              title={game.title}
              adsCount={game._count.ads}
            />
          )
        })}
      </div>
      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  )
}

export default App
