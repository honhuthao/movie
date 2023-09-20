import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { HTMLInputTypeAttribute, useState } from "react";
import { UseFormRegister } from "react-hook-form";
type InputProps = {
  register?: UseFormRegister<any>;
  error?: string;
  name?: string;
  className?: string;
  placeholder?: string;
  type: HTMLInputTypeAttribute;
};
export const Input = ({
  register,
  error,
  name,
  placeholder,
  type,
}: InputProps) => {
  const [typeS, setType] = useState(false);
  return (
    <div>
      {name == "matKhau" ? (
        <div className="mt-3 relative">
          <input
            placeholder={placeholder}
            type={typeS ? "text" : "password"}
            className="outline-blue-400 relative block w-full p-15 border  rounded-lg "
            {...register(name)}
          ></input>
          {typeS ? (
            <EyeOutlined
              onClick={() => setType(!typeS)}
              className=" cursor-pointer absolute top-1/2 right-10 -translate-y-1/2"
            />
          ) : (
            <EyeInvisibleOutlined
              onClick={() => setType(!typeS)}
              className=" cursor-pointer absolute top-1/2 right-10 -translate-y-1/2"
            />
          )}
        </div>
      ) : (
        <input
          placeholder={placeholder}
          type={type}
          className="outline-blue-400 relative block w-full p-15 border  rounded-lg "
          {...register(name)}
        ></input>
      )}
      {error && <p className="text-red-500"> {error}</p>}
    </div>
  );
};
