import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
export function getDeliveryOption(deliveryOptionsId) {
  let deliveryOption;

  deliveryOptions.forEach((Option) => {
    if (Option.id === deliveryOptionsId) {
      deliveryOption = Option;
    }
  });
  return deliveryOption || deliveryOption[0];
}

export const deliveryOptions = [
  {
    id: "1",
    deliveryDays: 7,
    priceCents: 0,
  },
  {
    id: "2",
    deliveryDays: 3,
    priceCents: 499,
  },
  {
    id: "3",
    deliveryDays: 1,
    priceCents: 999,
  },
];

export function calculalteDeliveryDate(deliveryOption) {
  let date = dayjs();
  let daysLeft = deliveryOption.deliveryDays;

  while (daysLeft > 0) {
    date = date.add(1, "day");
    const day = date.format("dddd");
    const isWeekend = (day === "Saturday" || day === "Sunday");

    if (!isWeekend) {
      daysLeft--;
    }
  }
  return date.format("dddd, MMMM D");
}
