import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import { Alert, Button } from "@material-tailwind/react";

const AlertComponent = ({
  message = "Sorry Something Went Wrong",
  color = "red",
  icon = <ExclamationTriangleIcon className="h-6" />,
  show = false,
  position = "relative",
  setShow,
}) => {
  return (
    <Alert
      color={color}
      icon={icon}
      show={show}
      className={`z-50 fixed left-1/2 -translate-x-1/2 w-[97.5%] top-[2.5%]`}
      dismissible={{
        onClose: () => setShow(false),
        action: (
          <Button variant="text" color="white" size="sm">
            Close
          </Button>
        ),
      }}
    >
      {typeof message === "string" && message}
      {typeof message === "object" &&
        !message.message &&
        Object.values(message).map((element, index) => {
          return <div>{element[0]}</div>;
        })}
      {typeof message === "object" && message.message && (
        <div>{message.message}</div>
      )}
    </Alert>
  );
};

export default AlertComponent;
