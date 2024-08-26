import React from "react";

type ToggleProps = {
  onActivate: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  onDeactivate: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const Toggle: React.FC<ToggleProps> = ({
  isActive,
  onActivate,
  onDeactivate,
  setIsActive,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const checked = e.target.checked;
    console.log(checked);
    if (checked) {
      onActivate(e);
    } else {
      onDeactivate(e);
    }
  };

  return (
    <>
      {isActive ? (
        <div className="status">Activated</div>
      ) : (
        <div className="status">Deactivated</div>
      )}
      <label className="switch">
        <input type="checkbox" onChange={handleChange} checked={isActive} />
        <span className="slider"></span>
      </label>
    </>
  );
};

export default Toggle;
