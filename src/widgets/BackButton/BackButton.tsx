import { useNavigate } from "react-router-dom";
import { Button } from "../../ui/components/Button";
import Left from "../../assets/icon/left";

type Props = {
  fallbackTo?: string;
};

export const BackButton = ({ fallbackTo = "/shop" }: Props) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate(fallbackTo);
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={handleBack}
      aria-label="Go back"
      className="h-12 w-12 p-0 rounded-xl"
    >
      <Left />
    </Button>
  );
};
