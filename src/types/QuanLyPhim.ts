export type ListFilm  = {
    maPhim:        number;
    tenPhim:       string;
    biDanh:        string;
    trailer:       string;
    hinhAnh:       string;
    moTa:          string;
    maNhom:        MaNhom;
    ngayKhoiChieu: Date;
    danhGia:       number;
    hot:           boolean;
    dangChieu:     boolean;
    sapChieu:      boolean;
}

export enum MaNhom {
    Gp01 = "GP01",
}
export type Banner= {
    maBanner: number;
    maPhim:   number;
    hinhAnh:  string;
}