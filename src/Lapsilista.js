
import React from 'react';
import {useEffect, useState} from 'react';


function Lapsilista(props) {
  const lapsenNimiMuuttui = (e, index, lapsenIndex) => {

  }
  return (
    <div>
      {props.Lapsilista.map((alkio, lapsenIndex) => 
      <div key={lapsenIndex}>
        <input onChange={(e) =>{ props.lapsenNimiMuuttui(e, props.parentIndex, lapsenIndex)}} value={alkio.lapsenNimi}>
        </input>
      </div>)}
    
    </div>
  );
}

export default Lapsilista;
