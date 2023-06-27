import "./LogMeal.css";

export default function InputForms({ formData, handleChange }) {
  return (
    <div className="form-container">
      <div className="form-row">
        <label htmlFor="item1">Meal Description: </label>
        <input
          type="text"
          id="meal_desc"
          className="meal-input"
          value={formData.meal_desc}
          onChange={handleChange}
        />
      </div>
      <br />
      <div className="form-row">
        <label htmlFor="item1">Item 1: </label>
        <input
          type="text"
          id="item1"
          className="item-input"
          value={formData.item1}
          onChange={handleChange}
        />
        &nbsp;&nbsp;
        <label htmlFor="quantity1">Quantity 1: </label>
        <input
          type="text"
          id="quantity1"
          className="quantity-input"
          value={formData.quantity1}
          onChange={handleChange}
        />
      </div>
      <div className="form-row">
        <label htmlFor="item2">Item 2: </label>
        <input
          type="text"
          id="item2"
          className="item-input"
          value={formData.item2}
          onChange={handleChange}
        />
        &nbsp;&nbsp;
        <label htmlFor="quantity2">Quantity 2: </label>
        <input
          type="text"
          id="quantity2"
          className="quantity-input"
          value={formData.quantity2}
          onChange={handleChange}
        />
      </div>
      <div className="form-row">
        <label htmlFor="item3">Item 3: </label>
        <input
          type="text"
          id="item3"
          className="item-input"
          value={formData.item3}
          onChange={handleChange}
        />
        &nbsp;&nbsp;
        <label htmlFor="quantity3">Quantity 3: </label>
        <input
          type="text"
          id="quantity3"
          className="quantity-input"
          value={formData.quantity3}
          onChange={handleChange}
        />
      </div>
      <div className="form-row">
        <label htmlFor="item4">Item 4: </label>
        <input
          type="text"
          id="item4"
          className="item-input"
          value={formData.item4}
          onChange={handleChange}
        />
        &nbsp;&nbsp;
        <label htmlFor="quantity4">Quantity 4: </label>
        <input
          type="text"
          id="quantity4"
          className="quantity-input"
          value={formData.quantity4}
          onChange={handleChange}
        />
      </div>
      <div className="form-row">
        <label htmlFor="item5">Item 5: </label>
        <input
          type="text"
          id="item5"
          className="item-input"
          value={formData.item5}
          onChange={handleChange}
        />
        &nbsp;&nbsp;
        <label htmlFor="quantity5">Quantity 5: </label>
        <input
          type="text"
          id="quantity5"
          className="quantity-input"
          value={formData.quantity5}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
