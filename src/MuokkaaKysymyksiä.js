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
  //Valitaan datasta oikea kysely käsiteltäväksi

  const näytäVaihtoehdot = (indexK) => {
    //Mikäli tuloksia ei ole palautettu, tulostetaan vain yksi checkbox
      return <div> {data[props.kyselyIndex].kysely[indexK].vastaukset.map((alkio, indexV) => 
      <div key={"vastaus"}>
        <label><Checkbox className="vastausCheckM" key= {"oikea" + props.kyselyIndex + "" + indexK + "" + indexV}
         checked={alkio.oikea} onChange={(e) => props.muutaOikeaVastaus(e, indexK, indexV)}/>
        </label>
        
        <Input key={"vastausInput" + props.kyselyIndex + "" + indexK + "" + indexV} 
        className="vastausM" defaultValue={alkio.vastaus} 
        onChange = {(e) => props.muokkaaVastausta(e, indexK, indexV)}></Input>

        <Button className="vastausPoisto" key={alkio}
        id={indexV} onClick={() => props.poistaVastaus(indexK, indexV)}><DeleteIcon></DeleteIcon></Button>

        </div>)}<Button className="lisääM" onClick={() => props.lisääVastaus(indexK)}><AddCircleOutlineIcon/></Button></div>
  }
  
  return (
    <div className="muokkausosio">
      <Button className="poistaTT" onClick={()=> props.poistaTentti()}><DeleteIcon/>Poista {data[props.kyselyIndex].nimi}</Button>
      <Button className="lisääUT" onClick={() => props.lisääUusiTentti()}><AddCircleOutlineIcon/>Lisää uusi tentti</Button>

      {data[props.kyselyIndex].kysely.map((item, indexK) => 
        <Card className="korttiM" elevation={3}>{console.log(item)}

          <Input className="kysymysM" 
            key={"kysymys" + props.kyselyIndex + "" + indexK}
            defaultValue={data[props.kyselyIndex].kysely[indexK].kysymys}
            onChange={(e) => props.muokkaaKysymystä(e, indexK)}>
          </Input> 

          <Button className="poistoM" onClick={() => props.poistaKysymys(indexK)}>
            <DeleteIcon/></Button>{näytäVaihtoehdot(indexK)}
        </Card>)}
      <div>
        <Button className="lisääK" onClick={() => props.lisääKysymys()}>
          <AddCircleOutlineIcon/></Button>
      </div>
    </div>
  )
}