import classnames from 'classnames';

export type SwitchOption = {
  key: string;
  value: string;
  label: string;
  className?: string;
};

interface Props<T extends string> {
  options: SwitchOption[];
  value: T;
  onChange: (value: T) => void;
  disabled?: boolean;
}

export function Switch<T extends string>(props: Props<T>) {
  const { options, value, onChange, disabled } = props;

  const handleClick = (value: T) => {
    if (disabled) {
      return;
    }
    onChange(value);
  };

  return (
    <div className="btn-group">
      {options.map((option) => (
        <button
          key={option.key}
          type="button"
          onClick={() => {
            handleClick(option.value as T);
          }}
          className={classnames(`${option.className}`, {
            active: value === option.value,
            disabled,
          })}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
