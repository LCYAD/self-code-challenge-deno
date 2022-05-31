import { COMMON_FIELD } from "./common.ts";

export const quotationResponse = {
  quotationId: COMMON_FIELD.QUOTATION_ID_FIELD,
  expireAt: COMMON_FIELD.AFTER_5_MINS_CURRENT_TIME,
  scheduleAt: COMMON_FIELD.AFTER_5_MINS_CURRENT_TIME,
  deliveryBy: COMMON_FIELD.AFTER_1HR_CURRENT_TIME,
  stops: [
    {
      coordinates: {
        lat: COMMON_FIELD.LAT,
        lng: COMMON_FIELD.LNG,
      },
      address: COMMON_FIELD.PICKUP_ADDRESS,
    },
    {
      coordinates: {
        lat: COMMON_FIELD.LAT,
        lng: COMMON_FIELD.LNG,
      },
      address: COMMON_FIELD.DROP_OFF_ADDRESS,
    },
  ],
  location: COMMON_FIELD.LOCATION,
  item: {
    quantity: COMMON_FIELD.NUMBER_FIELD,
    weight: COMMON_FIELD.NUMBER_FIELD,
    categories: [COMMON_FIELD.STRING_FIELD],
    handlingInstructions: [COMMON_FIELD.STRING_FIELD],
  },
};
