import PropTypes from 'prop-types';
import s from './contacts.module.css';

const Contacts = ({ items, removeContact }) => {
  const elements = items.map(({ id, name, number }) => (
    <li key={id} className={s.listItem}>
      <span>
        {name} {number}
      </span>
      <button onClick={() => removeContact(id)} className={s.btn} type="submit">
        Delete
      </button>
    </li>
  ));

  return (
    <>
      <ol>{elements}</ol>
    </>
  );
};

export default Contacts;

Contacts.defaultProps = {
  items: [],
};

Contacts.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
