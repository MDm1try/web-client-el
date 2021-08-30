import { CreatePolygon } from "@/components/Map";

export default function NewAdForm() {
  return (
    <form className="mt-4">
      <div className="col-10 bg-white p-3 mb-3 rounded-3 m-auto">
        <h1 className="my-3"> Создать новое объявление </h1>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Название
          </label>
          <input
            id="title"
            type="text"
            className="form-control"
            placeholder="Название"
          />
        </div>
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="area" className="form-label">
              Площадь
            </label>
            <input id="area" type="number" className="form-control" />
          </div>
          <div className="col">
            <label htmlFor="area" className="form-label">
              Цена
            </label>
            <input id="area" type="number" className="form-control" />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="cadastralRegisterNumber" className="form-label">
              Кадастрового номер
            </label>
            <input
              id="cadastralRegisterNumber"
              type="text"
              className="form-control"
              placeholder="XXXXXXXXX:XX:XXX:XXXX"
            />
          </div>
          <div className="col">
            <label htmlFor="category" className="form-label">
              Назначение
            </label>
            <select id="category" className="form-select">
              <option selected>Сategory 1</option>
              <option>Сategory 2</option>
              <option>Сategory 3</option>
              <option>Сategory 4</option>
            </select>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Описание
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows={3}
            placeholder="Описание"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formFile" className="form-label">
            Default file input example
          </label>
          <input className="form-control" type="file" id="formFile" />
        </div>
      </div>
      <CreatePolygon />
    </form>
  );
}
