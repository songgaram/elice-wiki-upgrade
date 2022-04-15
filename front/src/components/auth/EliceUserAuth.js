import { InputGroup, FormControl, Button } from "react-bootstrap";

const EliceUserAuth = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src="/image/logo_large.png" style={{ width: "10%" }} />
      <img src="/image/cal-bot.png" style={{ width: "30%" }} />
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Recipient's username"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <Button variant="outline-secondary" id="button-addon2">
          Button
        </Button>
      </InputGroup>
    </div>
  );
};
export default EliceUserAuth;
