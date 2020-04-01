import React from 'react';
import { useMemo } from 'react';

import {
  request
} from './services/serverless'


import json from './data/imgs.json';
import { useState } from 'react';
import { useCallback } from 'react';

import ItemImage from './components/ItemImage';
import Header from './components/Header';
import Buttons from './components/Buttons';
import Success from './components/Success';


function App() {

  const [load, setLoad] = useState(false)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [categoria] = useState(json[0].categoria);
  const [imgs, setImgs] = useState(json[0].imgs);
  const [totalSelecionavel] = useState(json[0].total)
  const [imgsSelecionadas, setImgsSelecionadas] = useState([])

 
  const removeSelected = useCallback((src) => {
    const rest = imgsSelecionadas.filter(item => {
      if (item === src) return false;
      return true;
    });
    setImgsSelecionadas(rest)
  }, [imgsSelecionadas, setImgsSelecionadas])


  const handlerSelect = useCallback((src) => {
    setError(false);

    const { length: isSelected } = imgsSelecionadas.filter(item => item === src);

    if (isSelected > 0) return removeSelected(src);
    if (imgsSelecionadas.length === totalSelecionavel) return;

    setImgsSelecionadas([...imgsSelecionadas, src])

  }, [imgsSelecionadas, setImgsSelecionadas, totalSelecionavel, removeSelected]);



  const loadImgs = useMemo(() => imgs.map((src, i) => {
    const { length: isSelected } = imgsSelecionadas.filter(item => item === src);
    return <ItemImage key={i} i={i} src={src} handlerSelect={handlerSelect} isSelected={isSelected} />
  }), [imgs, imgsSelecionadas, handlerSelect])



  const processImgs = useCallback(async () => {
    const [img1, img2, img3] = imgsSelecionadas;
    const response = await Promise.all([request(img1), request(img2), request(img3)])
    const responseFlat = response.flat();
    const responseFilter = responseFlat.filter(item => {
      if (item.Name !== categoria) return false;
      return true;
    })

    return responseFilter;
  }, [request, imgsSelecionadas, categoria])


  const handlerClick = useCallback(async () => {
    try {
      if (imgsSelecionadas.length === 0 || imgsSelecionadas.length !== totalSelecionavel) return setError(`Selecione todas imagens de ${categoria}`)
      setLoad(true)

      const response = await processImgs();

      setLoad(false)
      setImgsSelecionadas([])

      if (response.length !== totalSelecionavel) return setError(`Você não selecionou todas as imagens com ${categoria}`)

      setSuccess(true)

    } catch (error) {
      setLoad(false)
      setImgsSelecionadas([])
      console.error(error)
    }
  }, [imgsSelecionadas, totalSelecionavel, categoria, setSuccess, processImgs])


  const reload = useCallback(() => {
    setImgsSelecionadas([])
    const shuffled = imgs.map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value)
    setImgs(shuffled);
  }, [setImgsSelecionadas, setImgs, imgs])



  return (
    <div className="App">
      <header className="App-header">

        <div className="box-container">
          {!success ? (<div>
            <Header categoria={categoria} />
            <div>
              <div className="parent">{loadImgs}</div>
              {error && (<div className="error">{error}</div>)}
            </div>
            <Buttons handlerClick={handlerClick} reload={reload} load={load} />
          </div>) : (<Success reset={setSuccess} />)}
        </div>
      </header>
    </div>
  );
}

export default App;
