
import DiscussionCard from './discussionCard';
import * as React from 'react';
import { useReducer } from 'react';
import cardsReducer from '../state/cardsReducer';


Cards.propTypes = {
  data: PropTypes.shape({
    main: PropTypes.shape({
      id: PropTypes.string,
      text: PropTypes.string,
      stars: PropTypes.number,
      empty: PropTypes.bool,
      source: PropTypes.string,
      poster: PropTypes.string,
    }),
    children: PropTypes.array,
  }),
  onChangeCard: PropTypes.func,
};

export default function Cards({ data }) {
  const [state, dispatch] = useReducer(cardsReducer, data);

  function handleChangeCard(card, newQuestion) {
    dispatch({ type: 'changed', card: card, newQuestion: newQuestion });
  }

  const render = (state) => (
    state.map((q) => <DiscussionCard key={q.main.id} data={q} onChangeCard={handleChangeCard} />)
  );

  return (
    <div className='divClass'>
      {render(state)}
    </div>
  );
}
