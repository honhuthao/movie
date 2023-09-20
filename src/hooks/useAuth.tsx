import { useSelector } from "react-redux";
import { RootState } from "store";
// lấy thông tin user đăng nhập
export const useAuth = () => {
  const { user } = useSelector(
    (state: RootState) => state.quanLyNguoiDungToolkit
  );
  return { user };
};
