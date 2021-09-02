import { toggleVisibility } from './actions';

export default (state, {type, value}) => {
  switch (type) {
  case toggleVisibility:

    return { ...state, [value]: !state[value] };
  }
};
