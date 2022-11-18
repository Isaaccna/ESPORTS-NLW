import * as Dialog from '@radix-ui/react-dialog'
import { Check, GameController } from 'phosphor-react'
import { Input } from '../Form/Input'
import * as Checkbox from '@radix-ui/react-checkbox'
import { useEffect, useState, FormEvent } from 'react'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import axios from 'axios'
// import * Select from '@radix-ui/react-select'

interface Game {
  id: string
  title: string
}

export function CreateAdModal() {
  const [games, setGames] = useState<Game[]>([])
  const [weekDays, setWeekDays] = useState<string[]>([])
  const [useVoiceChannel, setUseVoiceChannel] = useState(false)

  useEffect(() => {
    axios('http://localhost:3000/games').then(response => {
      setGames(response.data)
    })
  }, [])

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault()

    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData)

    //validacao 
    if (!data.name) {
      return
    }

    try {
      axios.post(`http://localhost:3000/games/${data.game}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: useVoiceChannel
      })
      alert('Anúncio criado com sucesso!')
    } catch (err) {
      console.log(err)
      alert('Erro ao criar o anuncio')
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed">
        <Dialog.Content className="fixed bg-[#242634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-black/25">
          <Dialog.Title className="text-[32px]">
            Publique um anúncio
          </Dialog.Title>

          <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
            <div className="flex flex-col gap-2 ">
              <label className="font-semibold" htmlFor="game">
                Qual o game?
              </label>
              <select
                className="bg-zinc-900 py-3 px-4 rounded text-sm text-zinc-500"
                id="game"
                name="game"
                defaultValue=""
              >
                <option disabled value="">
                  Selecione o game que deseja jogar
                </option>
                {games.map(game => {
                  return (
                    <option key={game.id} value={game.id}>
                      {game.title}
                    </option>
                  )
                })}
              </select>
            </div>
            <div className="flex flex-col gap-2 ">
              <label htmlFor="name">Seu nome ou nickname</label>
              <Input
                name="name"
                id="name"
                type="text"
                placeholder="Como te chamam dentro do game?"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2 ">
                <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                <Input
                  name="yearsPlaying"
                  id="yearsPlaying"
                  type="number"
                  placeholder="Tudo bem ser ZERO"
                />
              </div>
              <div className="flex flex-col gap-2 ">
                <label htmlFor="discord">Qual seu Discord?</label>

                <Input
                  type="text"
                  name="discord"
                  id="discord"
                  placeholder="Usuario#0000"
                />
              </div>
            </div>
            <div className="flex gap-6 mb-2">
              <div className="flex flex-col gap-2 ">
                <label htmlFor="weekDays">Quando costuma jogar?</label>

                <ToggleGroup.Root
                  className="grid grid-cols-4 gap-1"
                  type="multiple"
                  value={weekDays}
                  onValueChange={setWeekDays}
                >
                  <ToggleGroup.Item
                    value="0"
                    className={`py-[7] px-3  rounded w-8 h-8 ${
                      weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'
                    }`}
                    title="Domingo"
                  >
                    D
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="1"
                    className={`py-[7] px-3  rounded w-8 h-8 ${
                      weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'
                    }`}
                    title="Segunda"
                  >
                    S
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="2"
                    className={`py-[7] px-3  rounded w-8 h-8 ${
                      weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'
                    }`}
                    title="Terça"
                  >
                    T
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="3"
                    className={`py-[7] px-3  rounded w-8 h-8 ${
                      weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'
                    }`}
                    title="Quarta"
                  >
                    Q
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="4"
                    className={`py-[7] px-3  rounded w-8 h-8 ${
                      weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'
                    }`}
                    title="Quinta"
                  >
                    Q
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="5"
                    className={`py-[7] px-3  rounded w-8 h-8 ${
                      weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'
                    }`}
                    title="Sexta"
                  >
                    S
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="6"
                    className={`py-[7] px-3  rounded w-8 h-8 ${
                      weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'
                    }`}
                    title="Sabado"
                  >
                    S
                  </ToggleGroup.Item>
                </ToggleGroup.Root>
              </div>
              <div className="flex flex-col gap-2 flex-1 ">
                <label htmlFor="hourStart">Qual horário do dia?</label>
                <div className="grid grid-cols-2 gap-2 ">
                  <Input
                    name="hourStart"
                    id="hourStart"
                    type="time"
                    placeholder="De"
                  />
                  <Input
                    name="hourEnd"
                    id="hourEnd"
                    type="time"
                    placeholder="Até"
                  />
                </div>
              </div>
            </div>
            <label className="flex gap-2 text-sm mb-4 items-center">
              <Checkbox.Root
                checked={useVoiceChannel}
                onCheckedChange={checked => {
                  if (checked === true) {
                    setUseVoiceChannel(true)
                  } else {
                    setUseVoiceChannel(false)
                  }
                }}
                className="w-6 p-1 h-6 rounded bg-zinc-900"
              >
                <Checkbox.Indicator>
                  <Check className="w-4 h-4 text-emerald-400" />
                </Checkbox.Indicator>
              </Checkbox.Root>
              Costumo me conectar ao chat de voz
            </label>

            <footer className="flex justify-end gap-4 ">
              <Dialog.Close className="py-3 px-5 bg-zinc-500 hover:bg-zinc-600 h-12 rounded-md w-[108px] font-semibold">
                Cancelar
              </Dialog.Close>
              <button
                className="py-3 px-5 bg-violet-500 hover:bg-violet-600 flex items-center gap-3 rounded-md font-semibold"
                type="submit"
              >
                <GameController size={24} />
                Encontrar duo
              </button>
            </footer>
          </form>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  )
}
