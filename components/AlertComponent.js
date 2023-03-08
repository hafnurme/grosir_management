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
      className={`z-50 ${position}`}
      dismissible={{
        onClose: () => setShow(false),
        action: (
          <Button variant="text" color="white" size="sm">
            Close
          </Button>
        ),
      }}
    >
      {message}
    </Alert>
  );
};

export default AlertComponent;
