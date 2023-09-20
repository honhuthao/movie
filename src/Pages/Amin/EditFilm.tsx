import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { DatePicker, Form, Input, InputNumber, Switch } from "antd";
import type { DatePickerProps } from "antd";
import { RootState, useAppDispatch } from "store";
import { useSelector } from "react-redux";
import { layThongTinPhimThunk } from "store/LayThongTinPhim/Thunk";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import dayjs from "dayjs";
import { CapNhatPhimThunk } from "store/CapNhatFilm/Thunk";
import { PATH } from "constant";
type SizeType = Parameters<typeof Form>[0]["size"];

const editFilm: React.FC = () => {
  const [componentSize, setComponentSize] = useState<SizeType | "default">(
    "default"
  );
  const { ThongTinPhim } = useSelector(
    (state: RootState) => state.LayThongTinPhimToolkit
  );
  const navigate = useNavigate();

  let { id } = useParams();
  useEffect(() => {
    dispatch(layThongTinPhimThunk(id));
  }, []);
  const dispatch = useAppDispatch();
  const [img, setImg] = useState<any>();
  const handelChangePicker: DatePickerProps["onChange"] = (dateString) => {
    formik.setFieldValue("ngayKhoiChieu", dateString);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maPhim: ThongTinPhim?.maPhim,
      dangChieu: ThongTinPhim?.dangChieu,
      sapChieu: ThongTinPhim?.sapChieu,
      hot: ThongTinPhim?.hot,
      danhGia: ThongTinPhim?.danhGia,
      tenPhim: ThongTinPhim?.tenPhim,
      trailer: ThongTinPhim?.trailer,
      moTa: ThongTinPhim?.moTa,
      maNhom: "GP01",
      ngayKhoiChieu: ThongTinPhim?.ngayKhoiChieu,
      hinhAnh: null,
    },
    onSubmit: async (values) => {
      let formData = new FormData();
      for (let keys in values) {
        if (keys == "hinhAnh") {
          if (values.hinhAnh !== null) {
            formData.append("File", values.hinhAnh, values.hinhAnh.name);
          }
        } else {
          formData.append(keys, values[keys]);
        }
      }
      await dispatch(CapNhatPhimThunk(formData));
      navigate(PATH.film);
    },
  });
  const handelChangeSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };
  const handelFiles = (e) => {
    let file = e.target.files[0];
    if (file.type === ("image/jpeg" || "image/png" || "image/jpg")) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImg(e.target.result);
      };
      formik.setFieldValue("hinhAnh", file);
    }
  };

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  return (
    <div>
      <h3 className="text-2xl font-500">Thêm phim mới</h3>

      <div className="mt-40">
        <Form
          onSubmitCapture={formik.handleSubmit}
          className="!container !mx-auto"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          initialValues={{ size: componentSize }}
          onValuesChange={onFormLayoutChange}
          size={componentSize as SizeType}
          style={{ maxWidth: 600 }}
        >
          {/* <Form.Item label="Form Size" name="size">
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item> */}
          <Form.Item label="Tên phim">
            <Input
              name="tenPhim"
              onChange={formik.handleChange}
              value={formik.values.tenPhim}
            />
          </Form.Item>
          <Form.Item label="Trailer">
            <Input
              name="trailer"
              value={formik.values.trailer}
              onChange={formik.handleChange}
            />
          </Form.Item>
          <Form.Item label="Mô tả">
            <Input
              name="moTa"
              value={formik.values.moTa}
              onChange={formik.handleChange}
            />
          </Form.Item>
          <Form.Item label="Ngày khởi chiếu">
            {/* <DatePicker onChange={handelChangePicker} /> */}
            <DatePicker
              onChange={handelChangePicker}
              value={dayjs(
                moment(formik?.values?.ngayKhoiChieu).format("DD/MM/YYYY"),
                "DD/MM/YYYY"
              )}
              format={"DD/MM/YYYY"}
            />
          </Form.Item>
          <Form.Item label="Hot" name="hot">
            <Switch
              onChange={handelChangeSwitch("hot")}
              checked={formik.values.hot}
            />
          </Form.Item>
          <Form.Item label="Sắp chiếu" name="sapChieu">
            <Switch
              onChange={handelChangeSwitch("sapChieu")}
              checked={formik.values.sapChieu}
            />
          </Form.Item>
          <Form.Item
            label="Đang chiếu"
            // valuePropName="checked"
            name="dangChieu"
          >
            <Switch
              onChange={handelChangeSwitch("dangChieu")}
              checked={formik.values.dangChieu}
            />
          </Form.Item>
          <Form.Item label="Điểm đánh giá">
            <InputNumber
              type="number"
              value={formik.values.danhGia}
              onChange={handelChangeSwitch("danhGia")}
              min={1}
              max={10}
            />
          </Form.Item>
          {/* <Form.Item
            label="Hình ảnh"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              onChange={handelFiles}
              action="/upload.do"
              listType="picture-card"
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item> */}
          <Form.Item label="Hình ảnh">
            <input type="file" onChange={handelFiles} />
            <img
              className="mt-5"
              src={img === undefined ? ThongTinPhim?.hinhAnh : img}
              width={200}
              height={200}
              alt=""
            />
          </Form.Item>
          <Form.Item label="Tác vụ">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Cập nhật
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default editFilm;
