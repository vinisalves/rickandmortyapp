import styled from "styled-components/native";



type StatusProps = {
  status: string;
};
export default styled.View<StatusProps>`
    width: 15px;
    height: 15px;
    border-radius: 20px;
    background-color: ${(props) => {
    switch (props.status) {
      case "Alive":
        return "lightgreen";

      case "Dead":
        return "red";

      case "unknown":
        return "gray";
      default:
        return "black";
        break;
    }
  }};
    
  `;