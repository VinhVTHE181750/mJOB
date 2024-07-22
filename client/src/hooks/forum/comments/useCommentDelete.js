import http from "../../../functions/httpService";

const useCommentDelete = () => {
  const deleteComment = async (id) => {
    try {
      const url = `/forum/comments/${id}`;
      await http.delete(url);
    } catch (error) {
      return error;
    }
  };

  return { deleteComment };
};

export default useCommentDelete;
