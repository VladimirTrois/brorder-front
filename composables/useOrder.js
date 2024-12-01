export const useOrder = () => useState('order', () => (
    {
        "name": "",
        "pitch": "",
        "pickUpDate": "",
        "items": []
      }
))

export const useResetOrder = () => useState('order', () => (
  {}
))