import EditForm from "../../components/forum/EditForm";
import NavigateButton from "../../components/ui/buttons/NavigateButton";

const EditPost = () => {
  return (
    <div className="forum-body">
      <NavigateButton
        path="/forum"
        text="Back to Forum"
        variant="primary"
        confirm={true}
        confirmMsg={"Discard changes and leave this page?"}
      />
      <EditForm />
    </div>
  );
};

export default EditPost;