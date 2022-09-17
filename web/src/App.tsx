import './styles/main.css'
import logo from './assets/logo-nlw-esports.svg'

import { GameBanner } from './components/GameBanner'
import { CreateAdBanner } from './components/CreateAdBanner'
import { useEffect, useState } from 'react';

import * as Dialog from '@radix-ui/react-dialog'
import { GameController } from 'phosphor-react';
import Input from './components/Form/Input';

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetch('http://localhost:3333/games')
      .then(response => response.json())
      .then(data => setGames(data))
  }, [])


  return <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
    <img src={logo} alt='Logo' />

    <h1 className='text-white text-6xl font-black mt-20'>
      Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> está aqui.
    </h1>

    <div className='grid grid-cols-6 gap-6 mt-16'>
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

    <Dialog.Root>
      <CreateAdBanner />

      <Dialog.Portal>
        <Dialog.Overlay className='bg-black/60 inset-0 fixed' />
        <Dialog.Content className='fixed bg-[#2A2635] rounded-lg shadow-lg shadow-black/75 w-[480px] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          <Dialog.Title className='text-3xl font-black'>Publique um anúncio</Dialog.Title>

          <form className='mt-8 flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
              <label htmlFor="game" className='font-semibold' >Qual o game?</label>
              <Input
                id='game'
                type='text'
                placeholder='Selecione o game que deseja jogar' />
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor="name">Seu nome (ou nickname)</label>
              <Input id='name' type="text" placeholder='Como te chamam dentro do game?' />
            </div>

            <div className='grid grid-cols-2 gap-6'>
              <div className='flex flex-col gap-2'>
                <label htmlFor="yearsPlaying">Joga há quanto tempo?</label>
                <Input id='yearsPlaying' type="number" placeholder='Tudo bem ser ZERO' />
              </div>

              <div className='flex flex-col gap-2'>
                <label htmlFor="discord">Qual seu discord?</label>
                <Input id='discord' type="text" placeholder='Usuário#0000' />
              </div>
            </div>

            <div className='flex gap-6'>
              <div className='flex flex-col gap-2'>
                <label htmlFor="weekDays">Quando costuma jogar?</label>
                <div className='grid grid-cols-4 gap-1' >
                  <button className='bg-zinc-900 w-10 h-10 rounded' title='Domingo'>D</button>
                  <button className='bg-zinc-900 w-10 h-10 rounded' title='Segunda'>S</button>
                  <button className='bg-zinc-900 w-10 h-10 rounded' title='Terça'>T</button>
                  <button className='bg-zinc-900 w-10 h-10 rounded' title='Quarta'>Q</button>
                  <button className='bg-zinc-900 w-10 h-10 rounded' title='Quinta'>Q</button>
                  <button className='bg-zinc-900 w-10 h-10 rounded' title='Sexta'>S</button>
                  <button className='bg-zinc-900 w-10 h-10 rounded' title='Sábado'>S</button>
                </div>
              </div>

              <div className='flex flex-col gap-2 flex-1'>

                <label htmlFor="hourStart">Qual horário do dia?</label>
                <div className='grid grid-cols-2 gap-2'>
                  <Input id='hourStart' type="time" placeholder='De' />
                  <Input id='hourEnd' type="time" placeholder='Até' />
                </div>
              </div>
            </div>

            <div className='mt-2 flex gap-2'>
              <Input type="checkbox" />
              Costumo me conectar ao chat de voz
            </div>

            <footer className='mt-4 flex justify-end gap-4'>
              <Dialog.Close className='bg-zinc-500 hover:bg-zinc-600 px-5 h-12 rounded-md font-semibold' >Cancelar</Dialog.Close>
              <button
                className='bg-violet-500 hover:bg-violet-600 px-5 h-12 rounded-md font-semibold flex items-center gap-3'
                type='submit' >
                <GameController size={24} />
                Encontrar duo
              </button>
            </footer>

          </form>

        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>

  </div>
}

export default App
