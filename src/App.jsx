import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [numbers, setNumbers] = useState(false);
  const [characters, setCharacters] = useState(false);
  const [password, setPassword] = useState('');
  const passwordReference = useRef(null);


  const numberClicked = () => {
    setNumbers((p) => !p);
  }
  const charClicked = () => {
    setCharacters((pc) => !pc);
  }

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numbers) str += '0123456789';
    if (characters) str += '!@#$%^&*()[]{}';

    for (let i = 0; i < length; i++) {
      let randNumber = Math.floor(Math.random() * str.length);
      pass += str.charAt(randNumber);
    }

    setPassword(pass);
  }, [length, numbers, characters, setPassword]);

  const copyPasswordToClip = useCallback(() => {
    passwordReference.current?.select();
    // passwordReference.current?.setSelectionRange(0, 3); used to select only 3 characters
    window.navigator.clipboard.writeText(password);
  }, [password]);

  // passwordGenerator();// causes infinite renders
  useEffect(() => { passwordGenerator() },
    [length, numbers, characters, passwordGenerator]);
  // These dependencies mean when they change call the function

  return (
    <>
      <div
        className="mx-5 md:mx-auto max-w-lg shadow-md text-white text-center mt-40 mb-4 font-serif text-3xl">Password Generator</div>
      <div
        className="mx-5 text-orange-500 md:gap-4 md:mx-auto flex flex-wrap flex-col md:px-5 max-w-lg border border-orange-500 bg-slate-900 py-5 px-2 lg:px-5 rounded-lg shadow-md">
        <div
          className="flex justify-center items-center px-2 md:px-0">
          <input
            type="text"
            className='w-full px-2 overflow-hidden py-1 text-orange-700 font-bold text-base font-serif rounded-l-lg'
            readOnly
            value={password}
            placeholder='Password'
            ref={passwordReference}
          />
          <button
            className='bg-cyan-900 hover:bg-cyan-600 border border-black shrink-0 px-4 py-1 font-bold text-base font-serif rounded-r-lg text-emerald-50'
            onClick={copyPasswordToClip}>
            Copy
          </button>
        </div>
        <div className="mt-4 flex flex-col md:flex-row md:gap-4 justify-center">
          <div className='flex justify-center items-center gap-5 md:gap-2'>
            <input
              type="range"
              min={6} max={30}
              value={length}
              className='cursor-pointer'
              onChange={(e) => setLength(e.target.value)} />
            <span className="text-orange-500 text-lg"> Length ({length})</span>
          </div>
          <div className='flex justify-center items-center gap-5 md:gap-2'>
            <input onClick={numberClicked} type="checkbox" />
            <span className=' text-lg'> Numbers</span>
          </div>
          <div className='flex justify-center items-center gap-5 md:gap-2'>
            <input onClick={charClicked} type="checkbox" />
            <span className='text-lg'> Characters</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
