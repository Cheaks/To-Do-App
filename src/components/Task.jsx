import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";

export default function task(props) {
  return (
    <section className="taskContainer">
      <div
        className={`taskCheck ${props.check ? "checked" : ""}`}
        onClick={props.clickHundler}
      >
        {props.check && <FontAwesomeIcon icon={faCheck} size="sm" />}
      </div>
      <div
        className="taskTitle"
        style={props.check ? { textDecoration: "line-through" } : {}}
      >
        {props.title}
      </div>
      <div className="taskDelete" onClick={props.removehundle}>
        <FontAwesomeIcon icon={faXmark} />
      </div>
    </section>
  );
}
