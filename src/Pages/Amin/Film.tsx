import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";

const { Search } = Input;
import { Table } from "antd";
import { Button } from "components/ui";
import { PATH } from "constant";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { RootState, useAppDispatch } from "store";
import Swal from "sweetalert2";
import { getListFilmThunk } from "store/QuanLyFilm/Thunk";
import { XoaPhimThunk } from "store/XoaPhim/Thunks";
const Film = () => {
  <ToastContainer />;
  const onSearch = (value: string) => {
    dispatch(getListFilmThunk(value));
    // setTenPhim(value);
    // lấy danh sách phim
  };
  const { listFilm } = useSelector(
    (state: RootState) => state.quanLyPhimToolKit
  );
  console.log(listFilm);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getListFilmThunk(""));
  }, []);
  const columns = [
    {
      title: "Mã phim",
      dataIndex: "maPhim",
      key: "maPhim",
    },
    {
      title: "Tên phim",
      dataIndex: "tenPhim",
      key: "tenPhim",
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
    },
    {
      title: "Mô tả",
      dataIndex: "moTa",
      key: "moTa",
    },
    {
      title: "Action",
      dataIndex: "Action",
      key: "Action",
    },
  ];
  const dataSource = listFilm?.map((item) => {
    return {
      maPhim: item.maPhim,
      tenPhim: item.tenPhim,
      hinhAnh: (
        <img
          src={item.hinhAnh}
          style={{ width: "100px", height: "100px" }}
          alt=""
        />
      ),
      moTa:
        item.moTa.length > 50 ? item.moTa.substring(0, 80) + "..." : item.moTa,
      Action: (
        <div>
          <Button
            onClick={() => {
              Swal.fire({
                title: "Bạn có muốn xóa không",
                text: "Trường này sẽ bị xóa vĩnh viễn",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Xác nhận xóa",
              }).then(async (result) => {
                if (result.isConfirmed) {
                  await dispatch(XoaPhimThunk(item?.maPhim));
                  Swal.fire("Deleted!", "Xóa thành công.", "success");
                  dispatch(getListFilmThunk(""));
                }
              });
            }}
            type="primary"
            danger
          >
            Xóa
          </Button>{" "}
          <Button
            onClick={() => {
              navigate(`/admin/film/edit/${item.maPhim}`);
            }}
            type="primary"
          >
            Sửa
          </Button>
        </div>
      ),
    };
  });

  return (
    <div className="">
      <h3 className="text-4xl font-500 my-5 text-left">Quản lý phim </h3>
      <Button onClick={() => navigate(PATH.addFilm)}>Thêm phim</Button>
      <div className="my-20">
        <Search
          placeholder="input search text"
          enterButton={<SearchOutlined />}
          size="large"
          onSearch={onSearch}
        />
      </div>
      <Table dataSource={dataSource} columns={columns} />;
    </div>
  );
};

export default Film;
