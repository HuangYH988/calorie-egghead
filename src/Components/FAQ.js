import "./App.css";

export default function FAQ() {
  return (
    <div className="FAQ-container">
      <br />
      <br />
      <span className="FAQ-container-text">
        Q: What units do I put for the Quantity field in the "Log Meal" feature?
      </span>
      <br />
      <span className="FAQ-container-text2">
        A: Units can be inputed as appropriate &#40; see sample input in
        brackets &#41; - unitless &#40; 1 &#41;; grams &#40; 200g &#41;;
        milliliters &#40; 330ml &#41; etc.
      </span>
      <br />
      <br />
      <br />
      <br />
      <span className="FAQ-container-text">
        Q: Do I need to provide the specific ingredients consumed in each meal
        when using the "Log Meal" feature?
      </span>
      <br />
      <span className="FAQ-container-text2">
        A: While calculation of calories may be more accurate if more granular
        information is provided, it is generally not necessary.
      </span>
      <br />
      <br />
      <br />
      <br />
      <span className="FAQ-container-text">
        Q: "Log Meal" feature: What do I input in the unused fields if I have
        less than 5 items?
      </span>
      <br />
      <span className="FAQ-container-text2">
        A: You can leave the unused fields blank.
      </span>
      <br />
      <br />
      <br />
      <br />
      <span className="FAQ-container-text">
        Q: "Log Meal" feature: How can I input more than 5 items in 1 meal?
      </span>
      <br />
      <span className="FAQ-container-text2">
        A: You can split the items perform 2 seperate inputs.
      </span>
    </div>
  );
}
