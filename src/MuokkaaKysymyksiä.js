import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Card from '@material-ui/core/Card';
import {useEffect, setState, useState} from 'react';
import { green } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Input } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

export default function MuokkaaKysymyksiä(props) {
  //Alustetaan data
  let data = props.kysymykset;
  let kyselyN = props.kyselyIndex;
  console.log(data)
  //Valitaan datasta oikea kysely käsiteltäväksi

  let palautettu = props.palautettu;

 

  // const muutaVastauksia = (data) => {
  //   return (<div> {data.map((item, index) => <div key={index}>
  //     <input onChange={(e) => vastausMuuttui(e, index)} 
  //       value={item.vastaus}>
  //     </input>
  //     <input onChange={(e) => valintaMuuttui(e, index)}>
  //       value={item.valittu}</input>
  //     <input onChange={(e) => oikeaVastausMuuttui(e, index)}
  //       value={item.oikea}>
  //     </input>
  //     </div>)}
      
  //     </div>)
  // }

  // const lisääKysymyksiä = () => {
  //   let syväKopio = JSON.parse(JSON.stringify(data));
  //   let uusiKysymys = {kysymys: "", valittu: false, oikea: false}
  //   syväKopio.push(uusiKysymys)
  //   setData(syväkopio)
  // }

  // const poistaKysymyksiä = () => {

  // }

  //Tulostetaan vaihtoehdot sen mukaan, onko vastaukset palautettu
  const näytäVaihtoehdot = (index) => {
    console.log(data.kysely)
    //Mikäli tuloksia ei ole palautettu, tulostetaan vain yksi checkbox
    if (palautettu === false){
      return data[props.kyselyIndex].kysely[index].vastaukset.map((alkio, vastausIndex) => 
      <div key={vastausIndex}>
        <label><Button disabled={palautettu === true}className="kysymys" key={alkio}
        id={vastausIndex}><DeleteIcon></DeleteIcon></Button>
        
        <Input value={alkio.vastaus}></Input></label>

        {/* {palautettu === true ? (<div><GreenCheckbox disabled className="vastaukset" checked={alkio.oikea}/>
        {alkio.vastaus}</div> : (<div></div>)} */}
        </div>)   
    }
  }
  
  return (
    <div>
      {data.map((item, index) => <Card className="kortti" elevation={3}><input className="kysymys" value={data[kyselyN].kysely[index].kysymys}>
      </input> {näytäVaihtoehdot(index)}
      </Card>)}
      <div>
        "MUOKKAUSOSIO""MUOKKAUSOSIO""MUOKKAUSOSIO""MUOKKAUSOSIO"
      </div>
    </div>
  )
}