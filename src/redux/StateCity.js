import { getWorldData } from "../AxiosFunctions/Axiosfunctionality"

export const allCityGetter  = async (letter) => {
  let allCityGetter = await getWorldData('ABD').then(res=> res.data.city)
  let tenTopCities = []
  let count = 0
  allCityGetter.map((val,ind)=>{
    if(val.toLowerCase().match(letter.toLowerCase())){
        if(count < 7){
          tenTopCities.push({
            label:val,
            value:val
          })
          count++
        }else{
          return
        }
    }
  })

  return tenTopCities

}

export  const cityGetter = async () => {
  return [
      {label: "Oaxaca de Juárez",value: "Oaxaca de Juárez"},
      {label: "Santiago de Querétaro",value: "Santiago de Querétaro"},
      {label: "Puebla de Zaragoza",value: "Puebla de Zaragoza"},
      {label: "Tepic",value: "Tepic"},
      {label: "Guadalajara",value: "Guadalajara"},
      {label: "Ciudad Juárez",value: "Ciudad Juárez"},
      {label: "Tuxtla Gutiérrez",value: "Tuxtla Gutiérrez"},
      {label: "San Francisco de Campeche",value: "San Francisco de Campeche"},
      {label: "Tijuana",value: "Tijuana"},
      {label: "Aguascalientes",value: "Aguascalientes"},
      {label: "Oaxaca de Juárez",value: "Oaxaca de Juárez"},
      {label: "Santiago de Querétaro",value: "Santiago de Querétaro"},
      {label: "Puebla de Zaragoza",value: "Puebla de Zaragoza"},
      {label: "Tepic",value: "Tepic"},
      {label: "Guadalajara",value: "Guadalajara"},
      {label: "Ciudad Juárez",value: "Ciudad Juárez"},
      {label: "Tuxtla Gutiérrez",value: "Tuxtla Gutiérrez"},
      {label: "San Francisco de Campeche",value: "San Francisco de Campeche"},
      {label: "Tijuana",value: "Tijuana"},
      {label: "Aguascalientes",value: "Aguascalientes"},
      {label: "Oaxaca de Juárez",value: "Oaxaca de Juárez"},
      {label: "Santiago de Querétaro",value: "Santiago de Querétaro"},
      {label: "Puebla de Zaragoza",value: "Puebla de Zaragoza"},
      {label: "Tepic",value: "Tepic"},
      {label: "Guadalajara",value: "Guadalajara"},
      {label: "Ciudad Juárez",value: "Ciudad Juárez"},
      {label: "Tuxtla Gutiérrez",value: "Tuxtla Gutiérrez"},
      {label: "San Francisco de Campeche",value: "San Francisco de Campeche"},
      {label: "Tijuana",value: "Tijuana"},
      {label: "Aguascalientes",value: "Aguascalientes"},
    ]
}

export  const stateGetter = () => {
    return [
        {label: "Aguascalientes",value: "Aguascalientes"},
        {label: "Baja California",value: "Baja California"},
        {label: "Campeche",value: "Campeche"},
        {label: "Chiapas",value: "Chiapas"},
        {label: "Chihuahua",value: "Chihuahua"},
        {label: "Jalisco",value: "Jalisco"},
        {label: "Nayarit",value: "Nayarit"},
        {label: "Oaxaca",value: "Oaxaca"},
        {label: "Querétaro",value: "Querétaro"},
        {label: "Puebla",value: "Puebla"},
        {label: "Aguascalientes",value: "Aguascalientes"},
        {label: "Baja California",value: "Baja California"},
        {label: "Campeche",value: "Campeche"},
        {label: "Chiapas",value: "Chiapas"},
        {label: "Chihuahua",value: "Chihuahua"},
        {label: "Jalisco",value: "Jalisco"},
        {label: "Nayarit",value: "Nayarit"},
        {label: "Oaxaca",value: "Oaxaca"},
        {label: "Querétaro",value: "Querétaro"},
        {label: "Puebla",value: "Puebla"},
        {label: "Aguascalientes",value: "Aguascalientes"},
        {label: "Baja California",value: "Baja California"},
        {label: "Campeche",value: "Campeche"},
        {label: "Chiapas",value: "Chiapas"},
        {label: "Chihuahua",value: "Chihuahua"},
        {label: "Jalisco",value: "Jalisco"},
        {label: "Nayarit",value: "Nayarit"},
        {label: "Oaxaca",value: "Oaxaca"},
        {label: "Querétaro",value: "Querétaro"},
        {label: "Puebla",value: "Puebla"},
      ]
}