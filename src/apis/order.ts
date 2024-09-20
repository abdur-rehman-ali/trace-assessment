import { Sample } from "../interfaces/sampleType";

export const getOrders = async () => {
  try {
    const dataURL = '/data/ordersData.json';
    const response = await fetch(dataURL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return []
  }
}


export const getSingleOrder = async (orderId: string) => {
  try {
    const response = await fetch('/data/samplesData.json');
    const samplesData = await response.json();
    const orderSamples = samplesData.filter((sample: Sample) => sample.orderId === orderId);
    return orderSamples
  } catch (error) {
    console.log(error);
  }
}