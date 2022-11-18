import { MagnifyingGlassPlus } from 'phosphor-react';
import * as Dialog from '@radix-ui/react-dialog'

export function CreateAdBanner () {
  return (
    <div className="pt-1 bg-nlwGradient self-stretch rounded-lg overflow-hidden">
    <div className="bg-[#2A2634] px-8 py-6  rounded-lg flex justify-between items-center ">
      <div>
        <h2 className="text-2xl text-white font-black">
          Não encontrou seu duo?
        </h2>
        <span className="text-zinc-400 text-base">
          Publique um anúncio para encontrar novos players!
        </span>
      </div>
      <Dialog.Trigger className="btn bg-violet-500 hover:bg-violet-600 text-white px-4 py-3 rounded flex items-center gap-3">
        <MagnifyingGlassPlus size={24}/>
        Publicar anúncio
        </Dialog.Trigger>
    </div>
  </div>
  )
}