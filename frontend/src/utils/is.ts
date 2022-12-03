
const is = {
  null: <T extends unknown>(value: T | null | undefined): value is (undefined | null) => value == null,
  notNull: <T extends unknown>(value: T | null | undefined): value is T => value != null,
};

export default is;
