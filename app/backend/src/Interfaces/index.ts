type NewEntity<T> = Omit<T, 'id'>;

type ID = number;

type Identifiable = { id: ID };

export {
  ID, NewEntity, Identifiable,
};
