
import DiscussionCard from './discussionCard';
import * as React from 'react';
import { useReducer } from 'react';
import cardsReducer from '../state/cardsReducer';
import PropTypes from 'prop-types';

Cards.propTypes = {
  data: PropTypes.array,
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
