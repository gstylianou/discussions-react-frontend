
const emptyCard = {
  main: {
    id: '1',
    text: null,
    stars: 0,
    empty: true,
  },
  children: [],
};

export default function cardsReducer(cards, action) {
  switch (action.type) {
    case 'changed':
      if (action.newQuestion == true) {
        const newCard = _.cloneDeep(emptyCard);
        newCard.main.id = (Number(cards[cards.length - 1].main.id) + 1).toString();
        return [
          ...cards,
          newCard,
        ];
      } else {
        cards.forEach((x) => {
          x.replyNumber = x.children.filter((x) => x.approved == true).length;
        });
        return cards;
      };
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
