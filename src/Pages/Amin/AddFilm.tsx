import React, { useState } from "react";
import { useFormik } from "formik";
import { DatePicker, Form, Input, InputNumber, Switch } from "antd";
import type { DatePickerProps } from "antd";
import { useAppDispatch } from "store";
import { ThemPhimThunk } from "store/ThemPhim/Thunk";

type SizeType = Parameters<typeof Form>[0]["size"];

const addFilm: React.FC = () => {
  const [componentSize, setComponentSize] = useState<SizeType | "default">(
    "default"
  );

  const dispatch = useAppDispatch();
  const [img, setImg] = useState<any>();
  // const handelChangeDatePicker = (value) => {
  //   console.log(moment(value).format("DD/MM/YYYY"));
  //   // let ngaykhoiChieu = moment(value).format("DD/MM/YYYY");
  //   // console.log(ngaykhoiChieu);
  //   // formik.setFieldValue("ngayKhoiChieu", ngaykhoiChieu);
  // };
  const handelChangePicker: DatePickerProps["onChange"] = (dateString) => {
    formik.setFieldValue("ngayKhoiChieu", dateString);
  };
  const formik = useFormik({
    initialValues: {
      tenPhim: "",
      trailer: "",
      maNhom: "GP01",
      moTa: "",
      ngayKhoiChieu: "",
      dangChieu: false,
      sapChieu: false,
      hot: false,
      danhGia: 0,
      hinhAnh: null,
    },
    onSubmit: (values) => {
      console.log(values);
      let formData = new FormData();
      for (let keys in values) {
        if (keys == "hinhAnh") {
          formData.append("File", values.hinhAnh, values.hinhAnh.name);
        } else {
          formData.append(keys, values[keys]);
        }
      }
      dispatch(ThemPhimThunk(formData));
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
            <Input name="tenPhim" onChange={formik.handleChange} />
          </Form.Item>
          <Form.Item label="Trailer">
            <Input name="trailer" onChange={formik.handleChange} />
          </Form.Item>
          <Form.Item label="Mô tả">
            <Input name="moTa" onChange={formik.handleChange} />
          </Form.Item>
          <Form.Item label="Ngày khởi chiếu">
            <DatePicker onChange={handelChangePicker} format={"DD/MM/YYYY"} />
          </Form.Item>
          <Form.Item label="Hot" valuePropName="checked" name="hot">
            <Switch onChange={handelChangeSwitch("hot")} />
          </Form.Item>
          <Form.Item label="Sắp chiếu" valuePropName="checked" name="sapChieu">
            <Switch onChange={handelChangeSwitch("sapChieu")} />
          </Form.Item>
          <Form.Item
            label="Đang chiếu"
            valuePropName="checked"
            name="dangChieu"
          >
            <Switch onChange={handelChangeSwitch("dangChieu")} />
          </Form.Item>
          <Form.Item label="Điểm đánh giá">
            <InputNumber
              type="number"
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
            <img className="mt-5" src={img} width={200} height={200} alt="" />
          </Form.Item>
          <Form.Item label="Tác vụ">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Thêm phim
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default addFilm;
