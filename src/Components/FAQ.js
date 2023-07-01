import "./App.css";

export default function FAQ() {
  return (
    <div className="FAQ-container">
      <br />
      <br />
      <p className="FAQ-container-text">
        Q: What units do I put for the Quantity field in the "Log Meal" feature?
      </p>
      <span className="FAQ-container-text2">
        A: Units can be just number of item, g, ml etc. as appropriate.
      </span>
      <br />
      <br />
      <br />
      <br />
      <p className="FAQ-container-text">
        Q: Do I need to provide the specific ingredients consumed of each meal
        in detail in the "Log Meal" feature?
      </p>
      <span className="FAQ-container-text2">
        A: While the calcualtion of the calories may be more accuarte if more
        granular information is required, it is not necessary.
      </span>
      <br />
      <br />
      <br />
      <br />
      <p className="FAQ-container-text">
        Q: How do I input in the "Log Meal" feature if I have less than 5 items?
      </p>
      <span className="FAQ-container-text2">
        A: You can leave the unsed input boxes blank.
      </span>
    </div>
  );
}
