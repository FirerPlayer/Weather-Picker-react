import Painel from './Painel';

function App() {
  return (
    <div id="app" className="transition-all duration-1000 flex flex-col items-center 
    absolute w-1/2 h-[80%] left-1/4 top-[10%] rounded-2xl bg-emerald-900 
    border border-solid border-[rgba(255,255,255,0.18)] 
    shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] text-zinc-200 hover:text-stone-800">
      <Painel />
    </div>
  );
}

export default App;
