import { GameBanner} from './components/GameBanner';
import { CreateAdBanner } from "./components/CreateAdBanner";
import { useEffect, useState } from 'react';
import { GameController } from 'phosphor-react';
import './styles/main.css';
import logoImg from './assets/nlw-esports.svg';
import * as Dialog from'@radix-ui/react-dialog'
import { Input } from './components/Form/input';


interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}


function App() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    fetch('http://localhost:3333/games')
    .then(response => response.json())
    .then(data => {
      setGames(data)
    })
  }, [])

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      {/* LOGO DA NLW eSPORTS */}
      <img src={logoImg} alt="Logo da NLW eSports" />
      {/* TEXTO SIMPLES */}
      <h1 className="text-6xl text-white font-black mt-20">
        Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> está aqui.
        </h1>
      {/* GAMES */}
      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map(game => {
          return (
            <GameBanner
              key={game.id}
              bannerUrl={game.bannerUrl}
              title={game.title}
              adsCount={game._count.ads}
        />
          )
        })}
      </div>
      {/* PUBLICAR ANUNCIO */}
      <Dialog.Root>
        <CreateAdBanner />

        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

          <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[400px] shadow-lg shadow-black/25">
            <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>
              {/* FORMULÁRIO */}
              <form className="mt-8 flex flex-col gap-4">
                {/* PRIMEIRA LABEL/INPUT */}
                <div className="flex flex-col gap-2"  >
                  <label htmlFor="game" className="font-semibold">Qual é o game?</label>
                  <Input
                  id="game"
                  placeholder="Selecione o game que deseja jogar"
                  />
                </div>
                {/* SEGUNDA LABEL/INPUT */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="font-semibold">Seu nome (ou nickname)</label>
                  <Input id="game" placeholder="Como te chamam dentro do game"/>
                </div>
                {/* TERCEIRA LABEL/INPUT */}
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="yearsPlaying">Joga a quantos anos?</label>
                  <Input name="yearsPlaying" id="yearsPlaying" type="number" placeholder="Tudo bem ser ZERO" />
                </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="discord">Qual o seu Discord?</label>
                    <Input name="discord" id="discord" type="text" placeholder="Usuario#0000" />
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="weekDays" className="font-semibold">Quando costuma jogar?</label>
                    <div className="grid grid-cols-4 gap-1">
                      <button
                       title="Domingo"
                       className='w-8 h-8 rounded bg-zinc-900'
                       >
                        D
                       </button>
                      <button
                        title="Segunda"
                        className='w-8 h-8 rounded bg-zinc-900'
                        >
                        S
                        </button>
                      <button
                      title="Terça"
                      className='w-8 h-8 rounded bg-zinc-900'
                        >
                        T
                        </button>
                      <button title="Quarta" className='w-8 h-8 rounded bg-zinc-900'>Q</button>
                      <button title="Quinta" className='w-8 h-8 rounded bg-zinc-900'>Q</button>
                      <button title="Sexta" className='w-8 h-8 rounded bg-zinc-900'>S</button>
                      <button title="Sábado" className='w-8 h-8 rounded bg-zinc-900'>S</button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <label htmlFor="hourStart" className="font-semibold">Qual horário do dia?</label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input id="hourStart" type="time" placeholder="De"/>
                      <Input id="hourEnd" type="time" placeholder="Até"/>
                    </div>
                  </div>
                </div>

                <div className="mt-2 flex gap-2 text-sm"> {/* text-sm = 14px */}
                  <Input type="checkbox" />
                  Costumo me conectar ao chat de voz
                </div>

                <footer className="mt-4 flex justify-end gap-4">
                  <button
                  className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"> Cancelar</button>
                  <button
                    className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
                    type="submit"
                  >
                    <GameController className="w-6 h-6"/>
                    Encontrar duo
                    </button>
                </footer>

              </form>
            </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}

export default App
