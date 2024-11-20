import {Outlet} from "react-router-dom";
import { DiagramContextProvider } from "../contexts/DiagramContextProvider";

const EmployeesContextLayout = () => {
  return (
    <DiagramContextProvider>
      <Outlet/>
    </DiagramContextProvider>
  );
};

export default EmployeesContextLayout;