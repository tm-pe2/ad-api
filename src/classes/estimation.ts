import * as Joi from 'joi';

export interface Estimation {
    estimation_id: number,
    service_type: number,
    address_id: number,
    building_type: number,
    family_size: number,
    past_consumption: number,
    equipments: string,
    estimated_consumption: number
}

export const estimationSchema = Joi.object({
    estimation_id: Joi.number().integer().min(0).required(),
    service_type: Joi.number().required(),
    address_id: Joi.number().integer().min(0).required(),
    building_type: Joi.number().required(),
    family_size: Joi.number().integer().min(1).required(),
    past_consumption: Joi.number().required(),
    equipments: Joi.string().required(),
    estimated_consumption: Joi.number().min(1).required()
});

export function estimateConsumption(estimation: Estimation): number {
    let value: number = 0;

    switch(estimation.family_size)
    {
      //daily electricity consumption in kWh of 'x' person(s) in an apartment:
      case 1:
        {
          value=18;
  
          break;
        }
      case 2:
        {
          value=28;
          break;
        }
      case 3:
        {
          value=40;
          break;
        }
      case 4:
        {
          value=60;
          break;
        }
    }
  
    //electricity consumption is adjusted depending on building type. e.g: closed house can get warmer easier than an open building, etc:
  
    switch(estimation.building_type)
    {
      case 1:
        {
          value-=5;
          break;
        }
      case 2:
        {
          value-=2;
          break;
        }
      case 3:
        {
          value+=5;
          break;
        }
    default:
        break;
    }
  
    let appliances: number[] = [];
    let res = estimation.equipments.split(',');
    res.forEach(element => {
        appliances.push(Number(element));
    });

    //the amount of kWh consumed in a day from an appliance is added to the estimated consumption
    appliances.forEach(app => {
      if(app==1)
      {value+=1}
      if(app==2)
      {value+=0.20}
      if(app==3)
      {value+=0.36}
      if(app==4)
      {value+=0.30}
      if(app==5)
      {value+=1.07}
    });
  
    return value * 365;
}
