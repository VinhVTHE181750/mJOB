import { useParams } from "react-router";
import EditForm from "../../components/forum/EditForm";
import NavigateButton from "../../components/ui/buttons/NavigateButton";

const EditPost = () => {
  const id = useParams().id;
  return (
    <div className="forum-body">
      <NavigateButton
        path="/forum"
        text="Back to Forum"
        variant="primary"
        confirm={true}
        confirmMsg={"Discard changes and leave this page?"}
      />
      <EditForm id={id}/>
    </div>
  );
};

export default EditPost;