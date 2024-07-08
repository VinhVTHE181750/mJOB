import {FloatingLabel, Form} from "react-bootstrap";

const PostSearch = () => {
  return (
    <Form className="">
      <FloatingLabel controlId="floatingTextarea2" label="Search">
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
        />
      </FloatingLabel>
    </Form>
  );
};

export default PostSearch;
